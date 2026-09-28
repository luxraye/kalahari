"""
Botswana Government Gazette Tender Parser & Synthesis Engine
Extracts, structures, and compiles high-value public procurement opportunities
using local offline AI (Qwen 2.5 7B via Ollama).
Outputs:
- botswana_gazette_tenders.xlsx (Formatted Excel Sheet)
- botswana_gazette_tenders.json (Structured JSON Database)
- weekly_tender_briefing.md (Executive Client Briefing)
"""

import os
import re
import json
import time
import requests
from pypdf import PdfReader
import pandas as pd

PDF_PATH = "sample_botswana_government_gazette.pdf"
OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:7b"

OUTPUT_EXCEL = "botswana_gazette_tenders.xlsx"
OUTPUT_JSON = "botswana_gazette_tenders.json"
OUTPUT_BRIEFING = "weekly_tender_briefing.md"

EXTRACTION_PROMPT_TEMPLATE = """You are an expert procurement and contract analyst in Botswana.
Extract the structured tender notice details from the following raw text into a strict JSON object.

RAW TENDER TEXT:
\"\"\"{text}\"\"\"

Return ONLY a valid JSON object matching this exact schema:
{{
  "tender_number": "string (e.g. MTPW/RRD/045/2026-2027)",
  "procuring_entity": "string (Ministry, Department, Parastatal or Council)",
  "tender_title": "string (Full descriptive title of the works/services/supplies)",
  "industry_category": "string (e.g. Civil Engineering / Roads, ICT & Systems, Water & Drilling, Waste Management, Medical & Healthcare)",
  "ppra_codes": ["string (e.g. Code 03, Sub-Code 01, Grade E)"],
  "citizen_reservation": "string (e.g. 100% Citizen Owned, Youth-Owned SME, CEEP preference)",
  "site_meeting": {{
    "held": true,
    "compulsory": true,
    "date_time": "string (or 'None')",
    "location": "string (or 'None')"
  }},
  "closing_date": "string (e.g. 30th October 2026)",
  "closing_time": "string (e.g. 10:00 hours)",
  "tender_fee_bwp": "string (e.g. BWP 1,500.00 or Free)",
  "bid_security_bwp": "string (e.g. BWP 250,000.00 or Bid Securing Declaration)",
  "submission_venue": "string (Tender box location / IPMS portal)"
}}
"""

def extract_text_from_pdf(pdf_path):
    print(f"Reading PDF: {pdf_path}")
    reader = PdfReader(pdf_path)
    full_text = ""
    for idx, page in enumerate(reader.pages):
        full_text += f"\n--- PAGE {idx+1} ---\n" + page.extract_text()
    return full_text

def split_into_notices(full_text):
    # Regex split on tender notice headers
    pattern = r'(?=(?:NOTICE OF TENDER INVITATION|PARASTATE TENDER INVITATION|COUNCIL TENDER NOTICE|MINISTERIAL TENDER NOTICE))'
    sections = re.split(pattern, full_text, flags=re.IGNORECASE)
    # Filter out empty or header intro sections
    notices = [s.strip() for s in sections if "TENDER NO:" in s.upper() or "PROCURING ENTITY:" in s.upper()]
    return notices

def query_local_llm(notice_text):
    prompt = EXTRACTION_PROMPT_TEMPLATE.format(text=notice_text)
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "format": "json",
        "stream": False,
        "options": {
            "temperature": 0.1,
            "num_predict": 1024
        }
    }
    response = requests.post(OLLAMA_API_URL, json=payload, timeout=120)
    response.raise_for_status()
    raw_json = response.json().get("response", "{}")
    return json.loads(raw_json)

def export_to_excel(tenders, excel_path):
    rows = []
    for t in tenders:
        site = t.get("site_meeting", {})
        site_str = "None"
        if site.get("held"):
            comp = "Compulsory" if site.get("compulsory") else "Non-Compulsory"
            site_str = f"{comp} on {site.get('date_time', '')} at {site.get('location', '')}"

        ppra_str = ", ".join(t.get("ppra_codes", [])) if isinstance(t.get("ppra_codes"), list) else str(t.get("ppra_codes", ""))

        rows.append({
            "Tender Number": t.get("tender_number"),
            "Procuring Entity": t.get("procuring_entity"),
            "Industry Category": t.get("industry_category"),
            "Tender Title": t.get("tender_title"),
            "PPRA Codes Required": ppra_str,
            "Citizen Reservation / Policy": t.get("citizen_reservation"),
            "Pre-Bid / Site Meeting": site_str,
            "Closing Date": t.get("closing_date"),
            "Closing Time": t.get("closing_time"),
            "Tender Fee": t.get("tender_fee_bwp"),
            "Bid Security / Bond": t.get("bid_security_bwp"),
            "Submission Venue": t.get("submission_venue")
        })

    df = pd.DataFrame(rows)

    with pd.ExcelWriter(excel_path, engine='xlsxwriter') as writer:
        df.to_excel(writer, sheet_name='Botswana Tenders', index=False)
        workbook = writer.book
        worksheet = writer.sheets['Botswana Tenders']

        # Format styles
        header_format = workbook.add_format({
            'bold': True,
            'text_wrap': True,
            'valign': 'top',
            'fg_color': '#002B49', # Botswana Navy Blue
            'font_color': '#FFFFFF',
            'border': 1
        })
        cell_format = workbook.add_format({
            'valign': 'top',
            'border': 1
        })

        for col_num, value in enumerate(df.columns.values):
            worksheet.write(0, col_num, value, header_format)
            max_len = max(df[value].astype(str).map(len).max(), len(value)) + 3
            worksheet.set_column(col_num, col_num, min(max_len, 40), cell_format)

    print(f"Exported formatted Excel sheet: {excel_path}")

def generate_markdown_briefing(tenders, briefing_path):
    md = []
    md.append("# Republic of Botswana: Weekly Tender Intelligence Briefing")
    md.append(f"**Publication Date:** September 2026 | **Source:** Government Gazette Extraordinary Supplement\n")
    md.append("This executive intelligence report summarizes the latest public procurement and parastatal tender notices extracted and categorized by the local AI pipeline.\n")
    md.append("---\n")

    for idx, t in enumerate(tenders, 1):
        site = t.get("site_meeting", {})
        site_str = "None"
        if site.get("held"):
            comp = "**Compulsory**" if site.get("compulsory") else "Non-Compulsory"
            site_str = f"{comp} ({site.get('date_time', '')}) &mdash; *{site.get('location', '')}*"

        ppra_str = ", ".join(t.get("ppra_codes", [])) if isinstance(t.get("ppra_codes"), list) else str(t.get("ppra_codes", ""))

        md.append(f"### {idx}. {t.get('tender_title')}")
        md.append(f"- **Tender Number:** `{t.get('tender_number')}`")
        md.append(f"- **Procuring Entity:** {t.get('procuring_entity')}")
        md.append(f"- **Category:** **{t.get('industry_category')}**")
        md.append(f"- **PPRA Eligibility:** `{ppra_str}`")
        md.append(f"- **Citizen Reservation:** {t.get('citizen_reservation')}")
        md.append(f"- **Site Meeting:** {site_str}")
        md.append(f"- **Deadline:** **{t.get('closing_date')} at {t.get('closing_time')}**")
        md.append(f"- **Fees & Bond:** Fee: `{t.get('tender_fee_bwp')}` | Bid Security: `{t.get('bid_security_bwp')}`")
        md.append(f"- **Submission:** {t.get('submission_venue')}\n")
        md.append("---\n")

    with open(briefing_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md))
    print(f"Generated Executive Briefing: {briefing_path}")

def main():
    start_time = time.time()
    print("=" * 60)
    print("STARTING BOTSWANA GAZETTE TENDER EXTRACTION PIPELINE")
    print(f"Model: {MODEL_NAME} (Offline Local GPU)")
    print("=" * 60)

    # 1. Ingest PDF
    raw_text = extract_text_from_pdf(PDF_PATH)
    notices = split_into_notices(raw_text)
    print(f"Found {len(notices)} tender notices to process.")

    # 2. Extract using Local AI
    structured_tenders = []
    for idx, notice in enumerate(notices, 1):
        print(f"\n[{idx}/{len(notices)}] Processing notice via {MODEL_NAME}...")
        t0 = time.time()
        record = query_local_llm(notice)
        dt = time.time() - t0
        print(f"  -> Extracted: {record.get('tender_number')} ({record.get('industry_category')}) in {dt:.2f}s")
        structured_tenders.append(record)

    # 3. Save JSON
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(structured_tenders, f, indent=2)
    print(f"\nSaved structured JSON database: {OUTPUT_JSON}")

    # 4. Save Excel
    export_to_excel(structured_tenders, OUTPUT_EXCEL)

    # 5. Generate Markdown Briefing
    generate_markdown_briefing(structured_tenders, OUTPUT_BRIEFING)

    elapsed = time.time() - start_time
    print("\n" + "=" * 60)
    print(f"PIPELINE COMPLETE IN {elapsed:.2f} SECONDS!")
    print(f"Structured {len(structured_tenders)} notices into Excel, JSON, and Executive Briefing.")
    print("=" * 60)

if __name__ == "__main__":
    main()
