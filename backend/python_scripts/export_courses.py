import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

def export_courses(output_path):
    mongo_uri = os.getenv("MONGO_DB", "mongodb://localhost:27017/ICLMS")
    client = MongoClient(mongo_uri)
    db = client["ICLMS"]
    collection = db["courses"]

    data = list(collection.find({}, {"_id": 0}))
    if data:
        df = pd.DataFrame(data)
        df.to_excel(output_path, index=False)
        print("Exported successfully.")
    else:
        print("No data to export.")

if __name__ == "__main__":
    export_courses("courses_export.xlsx")
