
# Building a model for fake news classifier using LSTM

# Import libraries
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense

# Sample dataset (text + labels)
texts = [
    "Breaking news government announces new policy",
    "Celebrity caught in shocking scandal",
    "Scientists discover new cure for disease",
    "Fake news click here to win money",
    "Shocking miracle cure doctors hate this",
    "Click here you won lottery claim now"
]

# Labels: 1 = real, 0 = fake
labels = [1, 1, 1, 0, 0, 0]

# Tokenization
tokenizer = Tokenizer(num_words=5000)
tokenizer.fit_on_texts(texts)

sequences = tokenizer.texts_to_sequences(texts)

# Padding sequences
max_len = 20
X = pad_sequences(sequences, maxlen=max_len)

y = tf.constant(labels)

# Build LSTM model
model = Sequential([
    Embedding(input_dim=5000, output_dim=64, input_length=max_len),
    LSTM(64),
    Dense(1, activation='sigmoid')   # Binary classification
])

# Compile model
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Train model
model.fit(X, y, epochs=10, batch_size=2)

# Test on new sample
test_text = ["Win money now click here"]
test_seq = tokenizer.texts_to_sequences(test_text)
test_pad = pad_sequences(test_seq, maxlen=max_len)

prediction = model.predict(test_pad)
print("Prediction (0=Fake, 1=Real):", prediction)
