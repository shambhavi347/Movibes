# Data processing
from urllib import response
import pandas as pd
import sys,json,numpy as np
import scipy.stats
# Visualization
import seaborn as sns
# Similarity
from sklearn.metrics.pairwise import cosine_similarity
from sklearn import preprocessing
import pymongo

# importing MongoClient from pymongo
from pymongo import MongoClient
 
# importing ObjectId from bson library
from bson.objectid import ObjectId

from bson.json_util import dumps


# if __name__ == "__main__":
picked_userid = sys.argv[1]
# print ("hello python")
client = pymongo.MongoClient("mongodb+srv://muskan:1909@cluster0.krdt4.mongodb.net/Movibes?retryWrites=true&w=majority")

#print(client)
db = client['Movibes']
col = db['preferences']
colU = db['users']
frd = db['friends']
# print(db.list_collection_names())


y=col.find()
w=col.find_one()




c = [i["id_friend"] for i in frd.find({"id_user": "622bb2a5689efbb6a70e8327"},{"_id": 0,"id_friend": 1})]
q = [i["id_user"] for i in frd.find({"id_friend":"622bb2a5689efbb6a70e8327"},{"_id": 0,"id_user": 1})]

x = c+q



# Create user-item matrix
columns = ["id_user","drama", "romance","action","thriller","mystery","comedy","musical","sci_fi","animated"]
data = list(map(lambda item: [item["id_user"],item["drama"], item["romance"] ,item["action"],item["thriller"],item["mystery"],item["comedy"],item["musical"] ,item["sci_fi"],item["animated"]], y))
df = pd.DataFrame(data,columns=['id_user','drama','romance','action','thriller','mystery','comedy',"musical","sci_fi","animated"])
# print(df)




# Normalize user-item matrix
matrix = df.pivot_table(index='id_user')
matrix.head()

# Normalize user-item matrix
matrix_norm = matrix.subtract(matrix.mean(axis=1), axis = 'rows')
matrix_norm.head()

# User similarity matrix using Pearson correlation
user_similarity = matrix_norm.T.corr()
user_similarity.head()

# Pick a user ID
# picked_userid = '622bb2a5689efbb6a70e8327'
# Remove picked user ID from the candidate list
user_similarity.drop(index=picked_userid, inplace=True)
# Take a look at the data
user_similarity.head()

#top 10 similar user
n = 10
# User similarity threashold
user_similarity_threshold = 0
# Get top n similar users
similar_users = user_similarity[user_similarity[picked_userid]>user_similarity_threshold][picked_userid].sort_values(ascending=False)

# print("622bb2a5689efbb6a70e8327")
# Print out top n similar users
# print(f'The similar users for user {picked_userid} are', list(similar_users.index.values)
lst = list(similar_users.index.values)




def fun(variable):
    #letters = ['a', 'e', 'i', 'o', 'u']
    if (variable in x):
        return False
    else:
        return True
  
  

  
# using filter function
filtered = filter(fun, lst)
  
for s in filtered:
    print(s)









