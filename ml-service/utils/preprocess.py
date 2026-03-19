import numpy as np


def build_features(students: float) -> np.ndarray:
    """
    Minimal feature builder for the baseline model.
    Input: students count
    Output: 2D array shape (1, 1)
    """
    try:
        val = float(students)
    except Exception:
        val = 0.0
    return np.array([[val]], dtype=float)

