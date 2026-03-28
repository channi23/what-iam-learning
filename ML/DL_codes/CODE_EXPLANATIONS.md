# Code Explanations

This document explains each major block from the Python scripts in this folder.
The left side shows the code block, and the right side explains what that block is doing.

## `WordEmbedding.py`

<table>
  <tr>
    <th>Code</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>
      <pre><code>#Implementation of Word Embedding - Bag of words , TF-IDF
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer</code></pre>
    </td>
    <td>
      This imports the two text vectorization tools used in the file. `CountVectorizer` converts text into raw word-count features, while `TfidfVectorizer` converts text into weighted features that reduce the importance of very common words.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code>documents = [
"I love machine learning",
"Machine learning is powerful",
"Deep learning is part of machine learning"
]</code></pre>
    </td>
    <td>
      This is the input dataset. Each string is treated as one document. The vectorizers learn the vocabulary from these sentences and then convert them into numerical form.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code>bow = CountVectorizer()
X_bow = bow.fit_transform(documents)</code></pre>
    </td>
    <td>
      A Bag-of-Words vectorizer is created and trained on the documents. `fit_transform()` does two jobs: it learns the vocabulary and transforms each sentence into a count-based feature vector.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code>print("Bag of Words Vocabulary:")
print(bow.get_feature_names_out())

print("\nBag of Words Matrix:")
print(X_bow.toarray())</code></pre>
    </td>
    <td>
      The learned vocabulary is printed first. Then the sparse matrix is converted into a normal NumPy-style array using `toarray()` so the word counts for each sentence can be viewed clearly.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code>tfidf = TfidfVectorizer()
X_tfidf = tfidf.fit_transform(documents)</code></pre>
    </td>
    <td>
      A TF-IDF vectorizer is created and trained on the same set of sentences. Unlike Bag-of-Words, the output values are not simple counts; they represent how important each word is in a document relative to the whole collection.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code>print("\nTF-IDF Vocabulary:")
print(tfidf.get_feature_names_out())

print("\nTF-IDF Matrix:")
print(X_tfidf.toarray())</code></pre>
    </td>
    <td>
      This prints the vocabulary used by TF-IDF and the resulting matrix. The matrix values are floating-point weights, showing which words carry more information in each sentence.
    </td>
  </tr>
</table>

## `alexNet.py`

<table>
  <tr>
    <th>Code</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>
      <pre><code>#Implementation alexnet architecture using python
# Import libraries
import tensorflow as tf
from tensorflow.keras import layers, models</code></pre>
    </td>
    <td>
      TensorFlow and Keras are imported to build and train the AlexNet-style convolutional neural network. `layers` provides neural network building blocks, and `models` is used to assemble them.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Load MNIST dataset
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()</code></pre>
    </td>
    <td>
      The MNIST handwritten digit dataset is loaded. `X_train` and `X_test` contain image data, while `y_train` and `y_test` contain the corresponding digit labels from 0 to 9.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0</code></pre>
    </td>
    <td>
      Pixel values originally range from 0 to 255. Dividing by `255.0` scales them to the range `0` to `1`, which usually helps training become more stable and efficient.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Resize to 227x227 and convert to RGB (AlexNet requirement)
X_train = tf.image.resize(X_train[..., tf.newaxis], (227, 227))
X_test = tf.image.resize(X_test[..., tf.newaxis], (227, 227))

X_train = tf.image.grayscale_to_rgb(X_train)
X_test = tf.image.grayscale_to_rgb(X_test)</code></pre>
    </td>
    <td>
      MNIST images are small grayscale images of size `28x28`. AlexNet expects larger RGB-style input, so the code first adds a channel dimension, resizes each image to `227x227`, and then converts the single grayscale channel into three identical RGB channels.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Build AlexNet model
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
])</code></pre>
    </td>
    <td>
      This defines an AlexNet-inspired CNN. The convolution layers detect visual patterns such as edges and shapes. Pooling layers reduce spatial size and computation. `Flatten()` converts the feature maps into a 1D vector. The dense layers perform high-level classification, and the final `softmax` layer outputs probabilities for the 10 digit classes.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Compile model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])</code></pre>
    </td>
    <td>
      The training setup is defined here. `adam` is the optimizer that updates weights, `sparse_categorical_crossentropy` is the correct loss for integer class labels, and `accuracy` is tracked to measure classification performance.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Train model (keep epochs low or your laptop will revolt)
model.fit(X_train, y_train, epochs=2, batch_size=32)</code></pre>
    </td>
    <td>
      The model is trained on the training data. `epochs=2` means the model sees the full training set twice, and `batch_size=32` means weights are updated after every 32 images.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Evaluate
loss, accuracy = model.evaluate(X_test, y_test)
print("Test Accuracy:", accuracy)</code></pre>
    </td>
    <td>
      The trained model is tested on unseen data. The code returns the test loss and accuracy, then prints the accuracy so you can judge how well the model generalizes.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Train model
model.fit(X_train, y_train, epochs=5, batch_size=32)

# Evaluate
loss, accuracy = model.evaluate(X_test, y_test)
print("Test Accuracy:", accuracy)</code></pre>
    </td>
    <td>
      This trains and evaluates the same model a second time for five more epochs. Since the model is not reset, training continues from the previous learned weights. So the total training is cumulative, not a separate fresh experiment.
    </td>
  </tr>
</table>

## `Auto_Encoders.py`

<table>
  <tr>
    <th>Code</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>
      <pre><code>#Develop a model to construct deep network using auto encoders
# Import libraries
import tensorflow as tf
from tensorflow.keras import Model
from tensorflow.keras.layers import Dense, Flatten, Input</code></pre>
    </td>
    <td>
      These imports provide the components needed to build an autoencoder. `Model` is used for defining a custom neural network with explicit input and output connections, while `Dense` and `Input` define the layers.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Load MNIST dataset
(X_train, _), (X_test, _) = tf.keras.datasets.mnist.load_data()</code></pre>
    </td>
    <td>
      The MNIST dataset is loaded again, but the labels are ignored using `_` because an autoencoder does not need class labels. It learns to reconstruct the input itself.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0</code></pre>
    </td>
    <td>
      The images are normalized to values between `0` and `1`. This is especially useful here because the final decoder layer uses a `sigmoid` activation, which also outputs values in that same range.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Flatten input (28x28 → 784)
X_train = X_train.reshape(-1, 784)
X_test = X_test.reshape(-1, 784)</code></pre>
    </td>
    <td>
      Each `28x28` image is reshaped into a flat vector of length `784`. Dense layers require 1D input vectors, so this flattening prepares the images for the encoder network.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># --------- Encoder ---------
input_layer = Input(shape=(784,))
encoded = Dense(256, activation='relu')(input_layer)
encoded = Dense(128, activation='relu')(encoded)
encoded = Dense(64, activation='relu')(encoded)   # bottleneck</code></pre>
    </td>
    <td>
      This is the encoder section. It compresses the original 784 features into a lower-dimensional representation. The final layer with 64 units is the bottleneck, which forces the model to keep only the most important information needed to rebuild the image.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># --------- Decoder ---------
decoded = Dense(128, activation='relu')(encoded)
decoded = Dense(256, activation='relu')(decoded)
decoded = Dense(784, activation='sigmoid')(decoded)</code></pre>
    </td>
    <td>
      This is the decoder section. It expands the compact bottleneck representation back to 784 values, trying to reconstruct the original image as accurately as possible.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Build Autoencoder Model
autoencoder = Model(inputs=input_layer, outputs=decoded)</code></pre>
    </td>
    <td>
      A full autoencoder model is created by connecting the input layer directly to the decoder output. This gives one end-to-end network that performs both compression and reconstruction.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Compile model
autoencoder.compile(optimizer='adam', loss='binary_crossentropy')</code></pre>
    </td>
    <td>
      The model is prepared for training. `adam` updates the weights, and `binary_crossentropy` measures how close the reconstructed pixel values are to the original normalized pixel values.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Train model (input = output)
autoencoder.fit(X_train, X_train,
                epochs=10,
                batch_size=256,
                validation_data=(X_test, X_test))</code></pre>
    </td>
    <td>
      The same data is used as both input and target output because the goal is reconstruction. During training, the model learns to reproduce each input image after passing it through the compressed bottleneck.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Evaluate reconstruction loss
loss = autoencoder.evaluate(X_test, X_test)
print("Reconstruction Loss:", loss)</code></pre>
    </td>
    <td>
      The trained autoencoder is evaluated on test images. The printed reconstruction loss shows how accurately the model can rebuild unseen images.
    </td>
  </tr>
</table>

## `HyperParameters.py`

<table>
  <tr>
    <th>Code</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>
      <pre><code>#Construct a deep learning model to find the efficient hyper paramters
# Install keras-tuner (run once if needed)
# !pip install keras-tuner

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import keras_tuner as kt</code></pre>
    </td>
    <td>
      These imports load TensorFlow, Keras, and Keras Tuner. Keras Tuner is the library that automatically tries different hyperparameter combinations such as layer size and learning rate.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Load dataset (MNIST again, simple and safe)
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()</code></pre>
    </td>
    <td>
      The MNIST digit dataset is loaded for a classification task. This gives training and test images along with their labels.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0</code></pre>
    </td>
    <td>
      The input images are scaled into the `0` to `1` range. This makes the optimization process more stable and consistent.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Model builder function (this is where tuning happens)
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

    return model</code></pre>
    </td>
    <td>
      This function defines the search space for tuning. The tuner calls it many times with different `hp` values. It tries different numbers of neurons, different counts of hidden layers, and different learning rates, then compiles each candidate model for training and evaluation.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Initialize tuner
tuner = kt.RandomSearch(
    build_model,
    objective='val_accuracy',
    max_trials=5,  # keep small for lab
    executions_per_trial=1,
    directory='tuner_dir',
    project_name='mnist_tuning'
)</code></pre>
    </td>
    <td>
      A random search tuner is created. It will sample up to 5 different hyperparameter combinations, train each one, and compare them based on validation accuracy. The results are stored in the `tuner_dir/mnist_tuning` folder.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Search best hyperparameters
tuner.search(X_train, y_train, epochs=3, validation_split=0.2)</code></pre>
    </td>
    <td>
      This starts the hyperparameter search. The tuner trains each candidate model for 3 epochs and reserves 20% of the training data for validation so it can compare configurations fairly.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Get best model
best_model = tuner.get_best_models(num_models=1)[0]</code></pre>
    </td>
    <td>
      After the search is complete, this fetches the top-performing model found by the tuner. Since only one best model is requested, index `[0]` gives that single model directly.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Evaluate
loss, acc = best_model.evaluate(X_test, y_test)
print("Best Model Accuracy:", acc)</code></pre>
    </td>
    <td>
      The best discovered model is evaluated on the unseen test set, and the final test accuracy is printed.
    </td>
  </tr>
</table>

## `SVM_CNN.py`

<table>
  <tr>
    <th>Code</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>
      <pre><code>#Impleement image classification using SVM in CNN

# Import libraries
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten
from sklearn import svm
from sklearn.metrics import accuracy_score</code></pre>
    </td>
    <td>
      This script combines deep learning and classical machine learning. TensorFlow/Keras is used to extract image features with a CNN, and scikit-learn's SVM is used as the final classifier. `accuracy_score` measures prediction performance.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Load dataset
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()</code></pre>
    </td>
    <td>
      The MNIST dataset is loaded. The CNN will learn features from the images, and the SVM will classify those features into digit labels.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0</code></pre>
    </td>
    <td>
      Pixel values are normalized from `0-255` to `0-1`. This helps the CNN process the images more effectively.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Reshape for CNN (add channel)
X_train = X_train.reshape(-1, 28, 28, 1)
X_test = X_test.reshape(-1, 28, 28, 1)</code></pre>
    </td>
    <td>
      CNN layers expect image tensors with an explicit channel dimension. Since MNIST is grayscale, each image gets one channel, making the shape `(height, width, 1)`.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># -------- CNN Feature Extractor --------
cnn = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),
    MaxPooling2D((2,2)),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D((2,2)),
    Flatten()
])</code></pre>
    </td>
    <td>
      This small CNN acts only as a feature extractor, not as a full classifier. The convolution layers detect image patterns, the pooling layers reduce spatial size, and `Flatten()` converts the final feature maps into feature vectors that can be passed into the SVM.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Extract features
train_features = cnn.predict(X_train)
test_features = cnn.predict(X_test)</code></pre>
    </td>
    <td>
      Each image is passed through the CNN, and the output flattened vectors are collected as learned features. These features are more informative than raw pixels for the SVM classifier.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># -------- SVM Classifier --------
clf = svm.SVC(kernel='rbf')</code></pre>
    </td>
    <td>
      An SVM classifier with an RBF kernel is created. The RBF kernel allows the model to learn non-linear decision boundaries between digit classes.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Train SVM
clf.fit(train_features, y_train)</code></pre>
    </td>
    <td>
      The SVM is trained using the feature vectors extracted by the CNN and the correct training labels.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Predict
y_pred = clf.predict(test_features)</code></pre>
    </td>
    <td>
      The trained SVM predicts labels for the test feature vectors generated by the CNN.
    </td>
  </tr>
  <tr>
    <td>
      <pre><code># Evaluate
accuracy = accuracy_score(y_test, y_pred)
print("SVM + CNN Accuracy:", accuracy)</code></pre>
    </td>
    <td>
      Prediction accuracy is computed by comparing the SVM's predictions against the true test labels. The final accuracy is printed to summarize the model's performance.
    </td>
  </tr>
</table>
