import pandas as pd
import json
import sys

try:
    file_path = "python_scripts/input_examinee.xlsx"
    df = pd.read_excel(file_path)

    if df.empty:
        raise ValueError("Excel file is empty")

    records = df.to_dict(orient="records")

    # Convert NaN to empty strings and ensure all fields are strings
    for record in records:
        for key in record:
            if pd.isna(record[key]):
                record[key] = ""  # Replace empty cells with empty string
            else:
                record[key] = str(record[key]).strip()  # Convert everything to string

    print(json.dumps(records))

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
