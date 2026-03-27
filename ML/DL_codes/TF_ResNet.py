#Implement CNN model using Tranfer learning with ResNet
# Import libraries
import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras import layers, models

# Load MNIST dataset
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()

# Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0

# Convert grayscale (28x28) → (32x32x3) for ResNet
X_train = tf.image.resize(X_train[..., tf.newaxis], (32, 32))
X_test = tf.image.resize(X_test[..., tf.newaxis], (32, 32))

X_train = tf.image.grayscale_to_rgb(X_train)
X_test = tf.image.grayscale_to_rgb(X_test)

# Load ResNet50 (pre-trained on ImageNet)
base_model = ResNet50(weights='imagenet',
                      include_top=False,
                      input_shape=(32, 32, 3))

# Freeze base model (important!)
base_model.trainable = False

# Add custom classification head
model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dense(10, activation='softmax')
])

# Compile model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train model
model.fit(X_train, y_train, epochs=5, batch_size=32)

# Evaluate
loss, accuracy = model.evaluate(X_test, y_test)
print("Test Accuracy:", accuracy)

