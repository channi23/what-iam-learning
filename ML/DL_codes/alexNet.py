#Implementation alexnet architecture using python
# Import libraries
import tensorflow as tf
from tensorflow.keras import layers, models

# Load MNIST dataset
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()

# Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0

# Resize to 227x227 and convert to RGB (AlexNet requirement)
X_train = tf.image.resize(X_train[..., tf.newaxis], (227, 227))
X_test = tf.image.resize(X_test[..., tf.newaxis], (227, 227))

X_train = tf.image.grayscale_to_rgb(X_train)
X_test = tf.image.grayscale_to_rgb(X_test)

# Build AlexNet model
model = models.Sequential([

    layers.Conv2D(96, (11,11), strides=4, activation='relu', input_shape=(227,227,3)),
    layers.MaxPooling2D(pool_size=(3,3), strides=2),

    layers.Conv2D(256, (5,5), padding='same', activation='relu'),
    layers.MaxPooling2D(pool_size=(3,3), strides=2),

    layers.Conv2D(384, (3,3), padding='same', activation='relu'),
    layers.Conv2D(384, (3,3), padding='same', activation='relu'),
    layers.Conv2D(256, (3,3), padding='same', activation='relu'),
    layers.MaxPooling2D(pool_size=(3,3), strides=2),

    layers.Flatten(),

    layers.Dense(4096, activation='relu'),
    layers.Dropout(0.5),

    layers.Dense(4096, activation='relu'),
    layers.Dropout(0.5),

    layers.Dense(10, activation='softmax')
])

# Compile model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train model (keep epochs low or your laptop will revolt)
model.fit(X_train, y_train, epochs=2, batch_size=32)

# Evaluate
loss, accuracy = model.evaluate(X_test, y_test)
print("Test Accuracy:", accuracy)
# Train model
model.fit(X_train, y_train, epochs=5, batch_size=32)

# Evaluate
loss, accuracy = model.evaluate(X_test, y_test)
print("Test Accuracy:", accuracy)

