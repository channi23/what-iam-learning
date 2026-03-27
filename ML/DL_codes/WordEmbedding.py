#Implementation of Word Embedding - Bag of words , TF-IDF
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
documents = [
"I love machine learning",
"Machine learning is powerful",
"Deep learning is part of machine learning"
]

bow = CountVectorizer()
X_bow = bow.fit_transform(documents)

print("Bag of Words Vocabulary:")
print(bow.get_feature_names_out())

print("\nBag of Words Matrix:")
print(X_bow.toarray())

tfidf = TfidfVectorizer()
X_tfidf = tfidf.fit_transform(documents)

print("\nTF-IDF Vocabulary:")
print(tfidf.get_feature_names_out())

print("\nTF-IDF Matrix:")
print(X_tfidf.toarray())
