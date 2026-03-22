# Architecture

## Components

- **React client (`client/`)**
  - Form input for students/prepared/wasted
  - Dashboard charts & alerts
  - Calls Express API via Axios

- **Express API (`server/`)**
  - Stores entries in MongoDB
  - Calls Flask ML service for predictions (optional **heuristic fallback** when `ALLOW_PREDICTION_FALLBACK=true`)
  - Computes waste percent and alert boolean (threshold from env)
  - `GET /health` reports Mongo + ML reachability; `GET /api/food/stats/summary` for dashboard aggregates
  - Optional **SMTP** email when NGO pickup is recorded

- **Flask ML service (`ml-service/`)**
  - RandomForestRegressor model
  - `POST /predict` for inference
  - Trains a baseline model automatically if `model.pkl` is missing

## Data flow

1. User submits form in React
2. React calls `POST /api/food`
3. Express calls Flask `POST /predict`
4. Express stores prediction + entry in MongoDB
5. React fetches `GET /api/food` and `GET /api/food/stats/summary` for dashboard analytics

**Google Maps** (optional): React loads the Maps JS API using `REACT_APP_GOOGLE_MAPS_API_KEY` in `client/.env` for NGO Places search on the Map page.

