import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" }
});

export async function createFoodEntry(payload) {
  const resp = await api.post("/food", payload);
  return resp.data;
}

export async function getFoodEntries() {
  const resp = await api.get("/food");
  return resp.data;
}

export async function notifyEntryNGOs(entryId, ngos) {
  const resp = await api.post(`/food/${entryId}/notify-ngos`, { ngos });
  return resp.data;
}

