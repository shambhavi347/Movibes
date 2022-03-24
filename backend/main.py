# Data processing
import pandas as pd
import numpy as np
import scipy.stats
# Visualization
import seaborn as sns
# Similarity
from sklearn.metrics.pairwise import cosine_similarity
import pymongo 
if __name__ == "__main__":
    print ("hello python")
    client = pymongo.MongoClient("mongodb+srv://muskan:1909@cluster0.krdt4.mongodb.net/Movibes?retryWrites=true&w=majority")
    #print(client)
    db = client['Movibes']
    col = db['preferences']
    print(db.list_collection_names())

    x={"username":"qwerty"}
    z={"tokens":1}
    y=col.find()
    #for result in y:
        #print(result,end="\n\n")

# Create user-item matrix
columns = ["id_user", "drama", "romance","action","thriller","mystery","comedy","musical","sci_fi","animated"]
data = list(map(lambda item: [item["id_user"], item["drama"], item["romance"] ,item["action"],item["thriller"],item["mystery"],item["comedy"],item["musical"] ,item["sci_fi"],item["animated"]], y))
df = pd.DataFrame.pivot_table(data,columns=['id_user','drama','romance','action','thriller','mystery','comedy',"musical","sci_fi","animated"])
#pivot = pd.pivot_table(df,columns='genres',index='id_user')
#print(df)
# Normalize user-item matrix
#matrix_norm = df.subtract(df.mean(axis=1), axis = 'rows')
#matrix_norm.head()
#print(matrix_norm)


