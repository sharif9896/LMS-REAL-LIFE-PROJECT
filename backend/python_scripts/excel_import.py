import pandas as pd
import json
import sys

try:
    file_path = "python_scripts/input_courses.xlsx"
    df = pd.read_excel(file_path)
    if df.empty:
        raise ValueError("Excel file is empty")
    records = df.to_dict(orient="records")
    print(json.dumps(records))
except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
