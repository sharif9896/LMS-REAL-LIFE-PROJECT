import pandas as pd
from pymongo import MongoClient
import sys
from dotenv import load_dotenv
import os

load_dotenv()

def import_courses(file_path):
    mongo_uri = os.getenv("MONGO_DB", "mongodb://localhost:27017/ICLMS")
    client = MongoClient(mongo_uri)
    db = client["ICLMS"]
    collection = db["courses"]

    df = pd.read_excel(file_path)
    data = df.to_dict(orient="records")

    if data:
        collection.insert_many(data)
        print("Imported successfully.")
    else:
        print("No data found in Excel.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide Excel file path.")
    else:
        import_courses(sys.argv[1])
