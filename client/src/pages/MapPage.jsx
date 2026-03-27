import React, { useEffect, useMemo, useRef, useState } from "react";
import { getFoodEntries, notifyEntryNGOs } from "../services/api";
import { formatNumber } from "../utils/helpers";

export default function MapPage() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapElRef = useRef(null);
  const infoWindowRef = useRef(null);

  const [entries, setEntries] = useState([]);
  const [geoError, setGeoError] = useState("");
  const [geo, setGeo] = useState(null); // { lat, lng }
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [loadingNGOs, setLoadingNGOs] = useState(false);
  const [nearbyNGOs, setNearbyNGOs] = useState([]);
  const [notifyError, setNotifyError] = useState("");
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [nearestNgo, setNearestNgo] = useState(null);

  const alertEntry = useMemo(() => {
    const alerts = (entries || []).filter((e) => e.alert && !e.notificationSent);
    return alerts[0];
  }, [entries]);

  useEffect(() => {
    getFoodEntries()
      .then(setEntries)
      .catch((err) => {
        console.error("Failed to fetch entries:", err);
      });
  }, []);

  useEffect(() => {
    if (mapsLoaded) return;
    if (!apiKey) return;

    // Load Google Maps JS API only when needed (client-side).
    const existing = document.getElementById("google-maps-script");
    if (existing) {
      setMapsLoaded(Boolean(window.google?.maps));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapsLoaded(Boolean(window.google?.maps));
    script.onerror = () => setGeoError("Failed to load Google Maps script. Check API key + billing.");
    document.head.appendChild(script);
  }, [apiKey, mapsLoaded]);

  useEffect(() => {
    if (!mapsLoaded) return;
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => {
        setGeoError(err.message || "Failed to get your location.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [mapsLoaded]);

  useEffect(() => {
    if (!mapsLoaded) return;
    if (!geo) return;
    if (!mapElRef.current) return;

    const google = window.google;
    const map = new google.maps.Map(mapElRef.current, {
      center: geo,
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false
    });

    const infoWindow = new google.maps.InfoWindow();
    infoWindowRef.current = infoWindow;

    setLoadingNGOs(true);
    setNearbyNGOs([]);

    const service = new google.maps.places.PlacesService(map);

    const nearbySearch = (keyword) =>
      new Promise((resolve) => {
        service.nearbySearch(
          {
            location: geo,
            radius: 2500,
            keyword
          },
          (results, status) => {
            resolve({ results: results || [], status });
          }
        );
      });

    const keywords = ["NGO", "nonprofit organization", "charity", "foundation"];
    (async () => {
      let found = [];
      for (const kw of keywords) {
        const { results, status } = await nearbySearch(kw);
        if (status === "OK" && results.length) {
          found = results;
          break;
        }
      }

      // Create markers
      found.slice(0, 12).forEach((place) => {
        if (!place.geometry?.location) return;
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          title: place.name
        });
        marker.addListener("click", () => {
          setSelectedNgo(place);
          const vicinity = place.vicinity ? `<div>${place.vicinity}</div>` : "";
          const ratingHtml = place.rating
            ? "<div>Rating: " + place.rating + " / 5</div>"
            : "";
          infoWindow.setContent(
            `<div style="font-family:Arial;min-width:180px">
              <div style="font-weight:700">${place.name || "NGO"}</div>
              ${vicinity}
              ${ratingHtml}
            </div>`
          );
          infoWindow.open(map, marker);
        });
      });

      // Calculate distances and find nearest NGO
      const ngosWithDistance = found.slice(0, 12).map((p) => {
        const ngoLat = p.geometry?.location?.lat();
        const ngoLng = p.geometry?.location?.lng();
        let distance = null;
        if (ngoLat && ngoLng && geo) {
          distance = calculateDistance(geo.lat, geo.lng, ngoLat, ngoLng);
        }
        return {
          placeId: p.place_id,
          name: p.name,
          vicinity: p.vicinity,
          lat: ngoLat,
          lng: ngoLng,
          distance: distance
        };
      });

      // Sort by distance and find nearest
      ngosWithDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      setNearestNgo(ngosWithDistance[0] || null);
      setNearbyNGOs(ngosWithDistance);
      setLoadingNGOs(false);
    })().catch(() => {
      setLoadingNGOs(false);
      setGeoError("Failed to search nearby NGOs. Check Places API permissions.");
    });
  }, [mapsLoaded, geo]);

  // Calculate distance between two coordinates (Haversine formula)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async function onNotify() {
    setNotifyError("");
    setNotifyLoading(true);
    try {
      if (!alertEntry) {
        setNotifyError("No alert entry found to notify.");
        return;
      }
      if (!nearbyNGOs.length) {
        setNotifyError("Search NGOs first. No nearby NGOs found.");
        return;
      }

      // Include location data in NGO notification
      const ngosWithLocation = nearbyNGOs.map(n => ({
        ...n,
        userLat: geo?.lat,
        userLng: geo?.lng
      }));

      await notifyEntryNGOs(alertEntry._id, ngosWithLocation, { userLat: geo?.lat, userLng: geo?.lng });
      const data = await getFoodEntries();
      setEntries(data);
    } catch (err) {
      setNotifyError(err?.response?.data?.message || err?.message || "Failed to notify NGOs");
    } finally {
      setNotifyLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-lg font-extrabold text-slate-900">NGO Map (optional)</div>
            <div className="mt-1 text-sm text-slate-600">
              Use your location to find nearby NGOs and request pickup for excess food alerts.
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700">
              {apiKey ? "Maps ready" : "Add API key"}
            </div>
            <img
              alt="NGO map illustration"
              src="/assets/ngo-map.svg"
              className="h-14 w-14 animate-floaty rounded-2xl border border-slate-200 bg-white"
            />
          </div>
        </div>

        {!apiKey ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-red-50 p-4 text-sm text-red-700">
            Add your Google Maps API key to `client/.env` as `REACT_APP_GOOGLE_MAPS_API_KEY`, then
            restart the React app.
          </div>
        ) : null}

        {geoError ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {geoError}
          </div>
        ) : null}

        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-extrabold text-slate-900">Nearby NGOs</div>
                <div className="text-xs font-bold text-slate-600">
                  {loadingNGOs ? "Searching..." : nearbyNGOs.length ? `${nearbyNGOs.length} found` : "—"}
                </div>
              </div>
              <div className="mt-3 h-[420px] w-full overflow-hidden rounded-xl border border-slate-200">
                <div ref={mapElRef} className="h-full w-full" />
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Tip: click a marker to view details. Markers are based on Places search with NGO keywords.
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-extrabold text-slate-900">Alert request</div>
              <div className="mt-1 text-xs text-slate-600">
                {alertEntry ? "Excess food detected. Request pickup from nearby NGOs." : "No active alerts to notify."}
              </div>

              {alertEntry ? (
                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-700">Waste alert</div>
                      <div className="mt-1 text-sm font-extrabold text-red-700">
                        {formatNumber(alertEntry.wastePercent, 1)}% waste
                      </div>
                    </div>
                    <div className="rounded-2xl bg-red-50 px-3 py-1 text-xs font-bold text-red-700">High</div>
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    Prepared: {alertEntry.foodPrepared} · Wasted: {alertEntry.foodWasted}
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={onNotify}
                      disabled={notifyLoading || loadingNGOs || !nearbyNGOs.length}
                      className="w-full rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {notifyLoading ? "Sending..." : "Request pickup from NGOs"}
                    </button>
                    {notifyError ? <div className="mt-2 text-xs text-red-700">{notifyError}</div> : null}
                  </div>
                </div>
              ) : null}

              {/* Nearest NGO Highlight */}
              {nearestNgo && (
                <div className="mt-4 rounded-2xl border-2 border-green-500 bg-green-50 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">📍</span>
                    <div className="text-xs font-extrabold text-green-800">NEAREST NGO</div>
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900">{nearestNgo.name}</div>
                  {nearestNgo.distance !== null && (
                    <div className="mt-1 text-xs text-green-700">
                      {(nearestNgo.distance * 1000).toFixed(0)} meters away
                    </div>
                  )}
                  {nearestNgo.vicinity && (
                    <div className="mt-1 text-xs text-slate-600">{nearestNgo.vicinity}</div>
                  )}
                </div>
              )}

              <div className="mt-4">
                <div className="text-xs font-extrabold text-slate-700">NGO list</div>
                <div className="mt-2 max-h-[220px] overflow-auto rounded-xl border border-slate-200 bg-white">
                  {nearbyNGOs.length ? (
                    <ul className="divide-y divide-slate-100">
                      {nearbyNGOs.map((n, idx) => (
                        <li
                          key={n.placeId}
                          className={`px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 ${nearestNgo && n.placeId === nearestNgo.placeId ? 'bg-green-50' : ''}
                          }`}
                          onClick={() => setSelectedNgo(n)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-slate-900">{n.name}</div>
                            {n.distance !== null && (
                              <div className="text-xs text-slate-500">
                                {(n.distance * 1000).toFixed(0)}m
                              </div>
                            )}
                          </div>
                          {n.vicinity ? <div className="mt-1 text-xs text-slate-600">{n.vicinity}</div> : null}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-3 py-4 text-sm text-slate-500">
                      {loadingNGOs ? "Searching nearby NGOs..." : "No results yet. Allow location access."}
                    </div>
                  )}
                </div>
              </div>

              {selectedNgo ? (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                  <div className="text-xs font-extrabold text-slate-700">Selected NGO</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{selectedNgo.name}</div>
                  {selectedNgo.vicinity ? (
                    <div className="mt-1 text-xs text-slate-600">{selectedNgo.vicinity}</div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

