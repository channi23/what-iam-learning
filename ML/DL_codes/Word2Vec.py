#Implementation of word embedding - Word2Vec

from gensim.models import Word2Vec
sentences = [
["i", "love", "machine", "learning"],
["machine", "learning", "is", "powerful"],
["deep", "learning", "is", "part", "of", "machine", "learning"]
]
model = Word2Vec(
sentences,
vector_size=50, # size of word vectors
window=3, # context window
min_count=1, # include all words
workers=4
)
print("Vocabulary:")
print(list(model.wv.index_to_key)

print("\nVector for 'learning':")
print(model.wv['learning'])

print("\nWords similar to 'machine':")
print(model.wv.most_similar('machine'))

