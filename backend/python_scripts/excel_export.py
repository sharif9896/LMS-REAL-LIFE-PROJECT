import sys, json
import pandas as pd

args = sys.argv
data_json = json.loads(args[1]) if len(args) > 1 and args[1] != '[]' else []

columns = ["coursename", "course_program", "exam_title", "exam_duration", "exam_Qs_limit"]

if len(data_json) == 0:
    df = pd.DataFrame(columns=columns)
else:
    df = pd.DataFrame(data_json)

df.to_excel("python_scripts/output_courses.xlsx", index=False)

