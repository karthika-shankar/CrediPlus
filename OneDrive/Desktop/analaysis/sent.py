import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
plt.style.use('ggplot')
df= pd.read_csv(r'C:\Users\priya\OneDrive\Desktop\analaysis\churn_data_1M.csv')
print(df.head())
# Encode categorical variables
le = LabelEncoder()
df['gender'] = le.fit_transform(df['gender'])         # Male=1, Female=0
df['city'] = le.fit_transform(df['city'])             # Encodes city names
df['churn'] = le.fit_transform(df['churn'])           # Yes=1, No=0

# Features and target
X = df.drop(columns=['churn'])
y = df['churn']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model training
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Prediction
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))
feat_importance = pd.Series(model.feature_importances_, index=X.columns)
feat_importance.nlargest(10).plot(kind='barh')
plt.title("Top Features Influencing Churn")
plt.xlabel("Importance")
plt.ylabel("Features")
plt.savefig("feature_importance.png")
print("Plot saved as 'feature_importance.png'")
