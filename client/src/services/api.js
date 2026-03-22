import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth functions
export async function registerUser(userData) {
  const resp = await api.post("/auth/register", userData);
  return resp.data;
}

export async function loginUser(credentials) {
  const resp = await api.post("/auth/login", credentials);
  return resp.data;
}

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

export async function getFoodStatsSummary() {
  const resp = await api.get("/food/stats/summary");
  return resp.data;
}

