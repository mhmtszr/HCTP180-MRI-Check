from flask import Flask,request,jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.metrics import r2_score

app = Flask(__name__)
df = pd.read_csv("cleveland_prepared.csv",sep = ",")

df = df.dropna()

x = df.drop(['col_13'], axis=1).values
y = df.col_13.values

rf = ExtraTreesClassifier(n_estimators = 100, random_state = 42)
rf.fit(x,y)


@app.route('/MRICheck', methods=['POST'])
def MRICheck():
    liste=[]
    liste.append(request.form['age'])
    liste.append(request.form['sex'])
    liste.append(request.form['chest'])
    liste.append(request.form['rbp'])
    liste.append(request.form['sc'])
    liste.append(request.form['fbs'])
    liste.append(request.form['ecg'])
    liste.append(request.form['mxhr'])
    liste.append(request.form['angina'])
    liste.append(request.form['depression'])
    liste.append(request.form['peakexercise'])
    liste.append(request.form['floros'])
    liste.append(request.form['tales'])
    return str(rf.predict([liste])[0])

if __name__ == "__main__":
    app.run()