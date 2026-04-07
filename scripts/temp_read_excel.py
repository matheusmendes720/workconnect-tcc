import pandas as pd
import json

file_path = r'c:\Users\mathe\code_space\senai\workconnect-tcc\Matheus Mendes Conceição Santana Santos - PoC-Prova de conceito.xlsx'

try:
    xl = pd.ExcelFile(file_path)
    print("Sheets:", xl.sheet_names)
    
    for sheet in xl.sheet_names:
        print(f"\n--- Sheet: {sheet} ---")
        df = pd.read_excel(xl, sheet_name=sheet)
        print("Columns:")
        for col in df.columns:
            print(f"- {col}")
        print("\nFirst 10 rows:")
        print(df.head(10).to_markdown())
except Exception as e:
    print(f"Error reading excel: {e}")
