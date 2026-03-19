import os

import joblib
from flask import Flask, jsonify, request
from flask_cors import CORS

from model.train_model import train_and_save
from utils.preprocess import build_features


def load_or_train(model_path: str):
    if os.path.exists(model_path):
        return joblib.load(model_path)
    train_and_save(model_path)
    return joblib.load(model_path)


app = Flask(__name__)
CORS(app)

MODEL_PATH = os.environ.get("MODEL_PATH", os.path.join(os.path.dirname(__file__), "model.pkl"))
model = load_or_train(MODEL_PATH)


@app.get("/health")
def health():
    return jsonify({"ok": True})


@app.post("/predict")
def predict():
    payload = request.get_json(silent=True) or {}
    students = payload.get("students")
    X = build_features(students)
    pred = float(model.predict(X)[0])
    return jsonify({"prediction": pred})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5001"))
    app.run(host="0.0.0.0", port=port, debug=True)

