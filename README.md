# AI Smart Food Waste Management System

Full-stack app to **track food prepared/wasted**, **predict food demand**, and show **dashboard analytics + alerts**.

## Tech stack

- **Frontend**: React, Tailwind CSS, Recharts, Axios
- **Backend**: Node.js (Express), MongoDB (Mongoose)
- **ML service**: Python (Flask), scikit-learn (Random Forest Regressor)

## Folder structure

Matches the structure you provided:

- `client/` React app
- `server/` Express API
- `ml-service/` Flask AI service
- `docs/` API + architecture notes

## Prerequisites

- Node.js 18+ (recommended)
- Python 3.10+ (recommended)
- MongoDB running locally (or use MongoDB Atlas connection string)

## Setup

### 1) Backend + client dependencies

From repo root:

```bash
npm run install:all
```

### 2) Environment variables

Copy `.env.example` to `.env` in the repo root:

```bash
copy .env.example .env
```

### 2a) Start MongoDB

You must have MongoDB running at `mongodb://127.0.0.1:27017` (or update `MONGODB_URI` to MongoDB Atlas).

- **Local MongoDB**: start your MongoDB service (e.g. `mongod`) and ensure port `27017` is listening.
- **MongoDB Atlas**: set `MONGODB_URI` to your Atlas connection string in `.env`.

### 3) Python ML service

Create a venv and install requirements:

```bash
cd ml-service
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
```

If you are on **Python 3.14** and `pip install` fails building wheels, install **Python 3.11 or 3.12** for best compatibility with `numpy`/`scikit-learn`, then recreate the venv.

### 4) Run everything

From repo root:

```bash
npm run dev
```

Services:

- **React**: `http://localhost:3000`
- **API**: `http://localhost:5000`
- **ML**: `http://localhost:5001`

## Notes

- The ML service trains a small baseline model on first run if `ml-service/model.pkl` is missing.
- Optional features (maps, SMS/email) are stubbed as extension points.

## Optional: Google Maps NGO integration

This app can show a nearby NGO map and store "pickup request" info for alert entries.

### 1) Get an API key

Enable in Google Cloud Console:

- Maps JavaScript API
- Places API

### 2) Configure client env

In `client/`, create `.env` (or copy from `client/.env.example`):

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Then restart the React app.

