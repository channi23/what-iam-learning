#Impleement image classification using SVM in CNN

# Import libraries
import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten
from sklearn import svm
from sklearn.metrics import accuracy_score

# Load dataset
(X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()

# Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0

# Reshape for CNN (add channel)
X_train = X_train.reshape(-1, 28, 28, 1)
X_test = X_test.reshape(-1, 28, 28, 1)

# -------- CNN Feature Extractor --------
cnn = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),
    MaxPooling2D((2,2)),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D((2,2)),
    Flatten()
])

# Extract features
train_features = cnn.predict(X_train)
test_features = cnn.predict(X_test)

# -------- SVM Classifier --------
clf = svm.SVC(kernel='rbf')

# Train SVM
clf.fit(train_features, y_train)

# Predict
y_pred = clf.predict(test_features)

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
print("SVM + CNN Accuracy:", accuracy)


