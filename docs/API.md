# API Documentation

## Backend (Express)

Base URL: `http://localhost:5000`

### Health (MongoDB + ML checks)

- `GET /health`

Response example:

```json
{
  "ok": true,
  "service": "ai-food-waste-api",
  "mongo": { "ok": true, "readyState": 1, "readyStateLabel": "connected" },
  "ml": { "ok": true, "status": 200, "message": "reachable" },
  "predictionFallbackEnabled": true
}
```

- `ok` is **true** when MongoDB is connected.
- `ml.ok` is **false** if Flask is down (unless `ML_SERVICE_URL` is unset, then `skipped: true`).
- `predictionFallbackEnabled` mirrors `ALLOW_PREDICTION_FALLBACK=true` in `.env`.

### Create entry + get prediction

- `POST /api/food`

Body:

```json
{
  "students": 120,
  "foodPrepared": 130,
  "foodWasted": 15
}
```

Response (saved MongoDB document):

```json
{
  "_id": "...",
  "students": 120,
  "foodPrepared": 130,
  "foodWasted": 15,
  "predictedFood": 131.2,
  "predictionSource": "ml",
  "wastePercent": 11.53,
  "alert": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```

`predictionSource` is `"ml"` (Flask Random Forest) or `"fallback"` (baseline 1.1× students when fallback is enabled and ML is unavailable).

If Flask is unreachable and `ALLOW_PREDICTION_FALLBACK` is **not** `true`, response:

- `503` — `{ "message": "...", "hint": "...", "code": "ML_UNAVAILABLE" }`

### List entries

- `GET /api/food`

### Aggregated stats (dashboard)

- `GET /api/food/stats/summary`

Response:

```json
{
  "totalEntries": 12,
  "alertEntries": 2,
  "avgWastePercent": 14.25,
  "avgPredictedFood": 118.5,
  "avgStudents": 105.2
}
```

### Notify nearby NGOs for an alert entry

- `POST /api/food/:id/notify-ngos`

Body:

```json
{
  "ngos": [
    { "placeId": "ChIJ...", "name": "NGO Name", "vicinity": "..." }
  ]
}
```

Response:

Saved fields on the entry (e.g. `notificationSent`, `notifiedNGOs`, `notificationAt`).

If `SMTP_*` variables are set in `.env`, an optional pickup-summary email is sent (see root `.env.example`).

## ML Service (Flask)

Base URL: `http://localhost:5001`

### Health

- `GET /health` → `{ "ok": true }`

### Predict

- `POST /predict`

Body:

```json
{ "students": 120 }
```

Response:

```json
{ "prediction": 131.2 }
```

Errors: `400` for missing/invalid `students`, `500` if the model fails.

## Google Maps (optional, client)

Configure in `client/.env`:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_key
```

Enable **Maps JavaScript API** and **Places API** in Google Cloud Console. Used by the Map page for NGO search.
