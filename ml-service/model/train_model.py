import os
from pathlib import Path

import joblib
import numpy as np
from sklearn.ensemble import RandomForestRegressor


DEFAULT_DATASET = [
    (100, 110),
    (120, 130),
    (80, 90),
    (150, 160),
    (200, 215),
    (60, 70),
]


def train_and_save(model_path: str | os.PathLike) -> str:
    X = np.array([[row[0]] for row in DEFAULT_DATASET], dtype=float)
    y = np.array([row[1] for row in DEFAULT_DATASET], dtype=float)

    model = RandomForestRegressor(
        n_estimators=200,
        random_state=42,
    )
    model.fit(X, y)

    model_path = str(model_path)
    Path(os.path.dirname(model_path)).mkdir(parents=True, exist_ok=True)
    joblib.dump(model, model_path)
    return model_path


if __name__ == "__main__":
    out = os.environ.get("MODEL_PATH", os.path.join(os.path.dirname(__file__), "..", "model.pkl"))
    saved = train_and_save(out)
    print(f"Saved model to {saved}")

