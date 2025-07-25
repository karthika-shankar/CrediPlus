import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import emoji
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # '0' = all logs, '3' = only fatal errors


df = pd.read_csv(r'C:\Users\priya\OneDrive\Desktop\analaysis\Indian_Banking_Churn_Dataset.csv')
print(df.head())


df["Account_Open_Date"] = pd.to_datetime(df["Account_Open_Date"], format="%Y-%m-%d", errors='coerce')
df["Last_Transaction_Date"] = pd.to_datetime(df["Last_Transaction_Date"], format="%Y-%m-%d", errors='coerce')

#Handle missing values
numeric_cols = ["Age", "Balance", "EstimatedSalary", "Monthly_Income", "CreditScore", "EMI_Amount"]
for col in numeric_cols:
    df[col] = df[col].fillna(df[col].mean())

categorical_cols = [
    "Gender", "Geography", "Native_Place", "Marital_Status",
    "Account_Type", "Loan_Status", "Branch_Code", "Customer_Review"
]
for col in categorical_cols:
    if df[col].isnull().any():
        mode_value = df[col].mode().iloc[0]
        df[col] = df[col].fillna(mode_value)

forward_fill_cols = ["Tenure", "HasCrCard", "IsActiveMember"]
df[forward_fill_cols] = df[forward_fill_cols].ffill()

# Remove rows with null CustomerID
df = df[df["CustomerID"].notnull()]

df = df.drop_duplicates()

df.to_csv("cleaned_banking_churn.csv", index=False)
sns.countplot(x='Exited', data=df)  # Distribution of target
plt.show()

# Integer conversions
df["Age"] = df["Age"].astype("int8")
df["CreditScore"] = df["CreditScore"].astype("int16")
df["Tenure"] = df["Tenure"].astype("int8")
df["NumOfProducts"] = df["NumOfProducts"].astype("int8")
df["HasCrCard"] = df["HasCrCard"].astype("int8")
df["IsActiveMember"] = df["IsActiveMember"].astype("int8")
df["Exited"] = df["Exited"].astype("int8")

# Float conversions
float_cols = ["Balance", "EstimatedSalary", "Monthly_Income", "EMI_Amount"]
for col in float_cols:
    df[col] = df[col].astype("float32")

# Optional: Convert review column to string explicitly
df["Customer_Review"] = df["Customer_Review"].astype("string")
tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")
model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")

# Sentiment labels for this model
labels = ['Negative', 'Neutral', 'Positive']

def preprocess_text(text):
    # Convert emojis to text like ':smile:'
    text = emoji.demojize(text)
    return text

def get_sentiment(text):
    text = preprocess_text(text)
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=128)
    outputs = model(**inputs)
    scores = outputs.logits.softmax(dim=1).detach().cpu().numpy()[0]
    max_score_idx = scores.argmax()
    return labels[max_score_idx], float(scores[max_score_idx])

# Apply sentiment analysis on the Customer_Review column
df['Customer_Review'] = df['Customer_Review'].fillna("")

df['Sentiment_Result'] = df['Customer_Review'].apply(get_sentiment)
df['Review_Sentiment'] = df['Sentiment_Result'].apply(lambda x: x[0])
df['Sentiment_Score'] = df['Sentiment_Result'].apply(lambda x: x[1])
df = df.drop(columns=["Sentiment_Result"])


print(df[['Customer_Review', 'Review_Sentiment', 'Sentiment_Score']].head())

# Save final cleaned dataset with sentiment
df.to_csv("cleaned_banking_churn_with_sentiment.csv", index=False)

# Optional: visualize sentiment distribution
sns.countplot(x='Review_Sentiment', data=df)
plt.title("Distribution of Review Sentiment")
plt.show()