import sys
import json
import pandas as pd

try:
    # Get data from Node.js argument
    args = sys.argv
    data_json = json.loads(args[1]) if len(args) > 1 and args[1] != '[]' else []

    # Define columns (same as your schema)
    columns = ["reg_no", "name", "class", "department", "dob", "course_exam"]

    # If data is empty, export template
    if len(data_json) == 0:
        df = pd.DataFrame(columns=columns)
    else:
        # Convert list of dicts to DataFrame
        df = pd.DataFrame(data_json, columns=columns)

    # Save to Excel
    file_path = "python_scripts/output_examinee.xlsx"
    df.to_excel(file_path, index=False)

except Exception as e:
    # Print error for Node.js console
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
