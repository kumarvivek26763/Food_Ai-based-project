# API Documentation

## Backend (Express)

Base URL: `http://localhost:5000`

### Health

- `GET /health`

Response:

```json
{ "ok": true }
```

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
  "wastePercent": 11.53,
  "alert": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```

### List entries

- `GET /api/food`

Response:

```json
[
  { "_id": "...", "students": 120, "...": "..." }
]
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

