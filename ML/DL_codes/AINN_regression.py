#Build a model using Artficial Neural Network for Regression Problem
# Import libraries
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load dataset (regression)
data = fetch_california_housing()
X = data.data
y = data.target

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Feature scaling (very important)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Build ANN model
model = Sequential([
    Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    Dense(32, activation='relu'),
    Dense(1)   # Single output (continuous value)
])

# Compile model
model.compile(optimizer='adam',
              loss='mean_squared_error',
              metrics=['mae'])

# Train model
model.fit(X_train, y_train, epochs=20, batch_size=32)

# Evaluate model
loss, mae = model.evaluate(X_test, y_test)
print("Mean Absolute Error:", mae)
