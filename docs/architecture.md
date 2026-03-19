# Architecture

## Components

- **React client (`client/`)**
  - Form input for students/prepared/wasted
  - Dashboard charts & alerts
  - Calls Express API via Axios

- **Express API (`server/`)**
  - Stores entries in MongoDB
  - Calls Flask ML service for predictions
  - Computes waste percent and alert boolean (threshold from env)

- **Flask ML service (`ml-service/`)**
  - RandomForestRegressor model
  - `POST /predict` for inference
  - Trains a baseline model automatically if `model.pkl` is missing

## Data flow

1. User submits form in React
2. React calls `POST /api/food`
3. Express calls Flask `POST /predict`
4. Express stores prediction + entry in MongoDB
5. React fetches `GET /api/food` for dashboard analytics

