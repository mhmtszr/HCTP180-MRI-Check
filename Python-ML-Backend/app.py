from flask import Flask,request,jsonify
import pandas as pd
from sklearn.ensemble import ExtraTreesClassifier

app = Flask(__name__)

def newLine(newLineList):
    csvFile = open('heart_data.csv', 'a') 
    csvLine = ",".join(newLineList)
    print(csvLine, file=csvFile)
    
def main():
    global rf
    df = pd.read_csv("heart_data.csv",sep = ",")
    df = df.dropna()
    x = df.drop(['col_13'], axis=1).values
    y = df.col_13.values
    rf = ExtraTreesClassifier(n_estimators = 100, random_state = 42)
    rf.fit(x,y)

main()

@app.route('/MRICheck', methods=['POST'])
def MRICheck():
    try:
        receivedData=[]
        receivedData.append(request.form['age'])
        receivedData.append(request.form['sex'])
        receivedData.append(request.form['chest'])
        receivedData.append(request.form['rbp'])
        receivedData.append(request.form['sc'])
        receivedData.append(request.form['fbs'])
        receivedData.append(request.form['ecg'])
        receivedData.append(request.form['mxhr'])
        receivedData.append(request.form['angina'])
        receivedData.append(request.form['depression'])
        receivedData.append(request.form['peakexercise'])
        receivedData.append(request.form['floros'])
        receivedData.append(request.form['tales'])
        return jsonify(status="success",prediction=str(rf.predict([receivedData])[0])), 200
    except:
        return jsonify(status="fail"), 400

@app.route('/newData', methods=['POST'])
def refreshFile():
    try:
        receivedData=[]
        receivedData.append(request.form['age'])
        receivedData.append(request.form['sex'])
        receivedData.append(request.form['chest'])
        receivedData.append(request.form['rbp'])
        receivedData.append(request.form['sc'])
        receivedData.append(request.form['fbs'])
        receivedData.append(request.form['ecg'])
        receivedData.append(request.form['mxhr'])
        receivedData.append(request.form['angina'])
        receivedData.append(request.form['depression'])
        receivedData.append(request.form['peakexercise'])
        receivedData.append(request.form['floros'])
        receivedData.append(request.form['tales'])
        receivedData.append(request.form['analyze'])
        newLine(receivedData)
        main()
        return jsonify(status="success"), 200
    except:
        return jsonify(status="fail"), 400
    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
