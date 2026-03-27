#Develop a model to construct deep network using auto encoders
# Import libraries
import tensorflow as tf
from tensorflow.keras import Model
from tensorflow.keras.layers import Dense, Flatten, Input

# Load MNIST dataset
(X_train, _), (X_test, _) = tf.keras.datasets.mnist.load_data()

# Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0

# Flatten input (28x28 → 784)
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)

# --------- Encoder ---------
input_layer = Input(shape=(784,))
encoded = Dense(256, activation='relu')(input_layer)
encoded = Dense(128, activation='relu')(encoded)
encoded = Dense(64, activation='relu')(encoded)   # bottleneck

# --------- Decoder ---------
decoded = Dense(128, activation='relu')(encoded)
decoded = Dense(256, activation='relu')(decoded)
decoded = Dense(784, activation='sigmoid')(decoded)

# Build Autoencoder Model
autoencoder = Model(inputs=input_layer, outputs=decoded)

# Compile model
autoencoder.compile(optimizer='adam', loss='binary_crossentropy')

# Train model (input = output)
autoencoder.fit(X_train, X_train,
                epochs=10,
                batch_size=256,
                validation_data=(X_test, X_test))

# Evaluate reconstruction loss
loss = autoencoder.evaluate(X_test, X_test)
print("Reconstruction Loss:", loss)


