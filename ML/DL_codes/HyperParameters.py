#Construct a deep learning model to find the efficient hyper paramters
# Install keras-tuner (run once if needed)
# !pip install keras-tuner

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import keras_tuner as kt

# Load dataset (MNIST again, simple and safe)
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

# Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0

# Model builder function (this is where tuning happens)
def build_model(hp):
    model = keras.Sequential()

    model.add(layers.Flatten(input_shape=(28, 28)))

    # Tune number of units
    hp_units = hp.Int('units', min_value=32, max_value=256, step=32)
    model.add(layers.Dense(units=hp_units, activation='relu'))

    # Tune number of hidden layers
    for i in range(hp.Int('num_layers', 1, 3)):
        model.add(layers.Dense(
            units=hp.Int(f'units_{i}', min_value=32, max_value=256, step=32),
            activation='relu'
        ))

    model.add(layers.Dense(10, activation='softmax'))

    # Tune learning rate
    hp_lr = hp.Choice('learning_rate', values=[1e-2, 1e-3, 1e-4])

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=hp_lr),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    return model

# Initialize tuner
tuner = kt.RandomSearch(
    build_model,
    objective='val_accuracy',
    max_trials=5,  # keep small for lab
    executions_per_trial=1,
    directory='tuner_dir',
    project_name='mnist_tuning'
)

# Search best hyperparameters
tuner.search(X_train, y_train, epochs=3, validation_split=0.2)

# Get best model
best_model = tuner.get_best_models(num_models=1)[0]

# Evaluate
loss, acc = best_model.evaluate(X_test, y_test)
print("Best Model Accuracy:", acc)
