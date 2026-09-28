"""
Kalahari.ai Enterprise Client Outreach Dispatcher
Direct B2B outreach for Botswana Customs Clearing Agents & PPRA Commercial Contractors.
Features 40 individualized, bespoke email drafts with zero placeholders.
Supports --dry-run (preview) and --send (SMTP dispatch).
"""

import sys
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ==============================================================================
# SENDER IDENTITY (Gift Jr Letso Nakedi)
# ==============================================================================
SENDER_NAME = "Gift Jr Letso Nakedi"
SENDER_EMAIL = "taylith338@gmail.com"
CORPORATE_EMAIL = "gnakedi@bloodchain.life"
SENDER_PHONE = "+267 72161038"
PORTAL_URL = "https://kalahari-optis.vercel.app"

# ==============================================================================
# 40 INDIVIDUALIZED EMAIL CAMPAIGNS (ZERO PLACEHOLDERS)
# ==============================================================================
OUTREACH_CAMPAIGNS = [
    # --------------------------------------------------------------------------
    # TRACK 1: CUSTOMS CLEARING AGENTS & FREIGHT FORWARDERS
    # --------------------------------------------------------------------------
    {
        "id": "customs-01",
        "company": "Dianella Investments",
        "to": "info@dianellaclearing.com",
        "track": "Customs",
        "subject": "Automating BURS SAD 500 Pre-Lodgments for Dianella Investments (G-West Unit 5)",
        "body": f"""Dumelang Team Dianella Investments,

I am writing directly to your team at Unit 5 in G-West Industrial regarding the BURS mandatory pre-lodgment customs enforcement.

With the current BURS road freight regime, commercial consignments and vehicle imports crossing at Tlokweng and Pioneer Gate face the BWP 10,000 non-lodgment penalty if SAD 500 entries are delayed. For Dianella's clearing operations, manually transcribing multi-item commercial invoices into BURS CMS while checking 8-digit HS tariff classifications and SADC rules of origin takes hours per truck.

We have engineered Kalahari.ai right here in Gaborone. Our sovereign document intelligence engine converts complex foreign commercial invoices into fully assessed BURS SAD 500 declarations (with automated VDP in Botswana Pula, SADC zero-duty vs MFN duty, and 14% VAT) in under 30 seconds.

Because our core extraction runs locally in Botswana without routing financial data across foreign cloud servers, Dianella remains 100% compliant with Section 74 of the Botswana Data Protection Act (DPA).

You can evaluate the live engine and download sample SAD 500 Excel/JSON schedules directly on our portal:
{PORTAL_URL}/customs

I would welcome a brief 10-minute demonstration at your G-West office or on Microsoft Teams this week.

Warm regards,

{SENDER_NAME}
Lead Regulatory Solutions Architect | Kalahari.ai
Direct / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Gaborone, Botswana"""
    },
    {
        "id": "customs-02",
        "company": "HP Global Logistics",
        "to": "info@hpglogistics.com",
        "track": "Customs",
        "subject": "Pre-Lodgment SAD 500 Automation for HP Global Logistics (G-West Ext 14)",
        "body": f"""Good day Team HP Global Logistics,

I am reaching out to your freight team at Plot 22127 in G-West Industrial Extension 14.

As cross-border road freight volumes across the Southern African corridor increase, the BURS BWP 10,000 pre-lodgment failure penalty has made rapid customs turnaround critical for regional logistics providers. Manually processing multi-line foreign commercial invoices into BURS Single Administrative Documents (SAD 500) creates severe border bottlenecks for your haulage partners.

Kalahari.ai automates this entire pre-clearance workflow. Our platform ingests foreign commercial invoices (PDF, Excel, or scans) and extracts all line items, validates 8-digit HS Tariff Codes, calculates Botswana Pula VDP, checks SADC trade protocol duty status, and generates ready-to-lodge BURS SAD 500 dockets in 30 seconds.

Key operational benefits for HP Global Logistics:
1. Zero border demurrage: trucks pre-cleared before arriving at border gates.
2. 100% Botswana DPA Section 74 compliant: zero sensitive financial data sent outside Botswana.
3. Instant export into BURS CMS/ASYCUDA-compatible Excel and JSON EDI.

Explore the operational system live here:
{PORTAL_URL}/customs

I would be glad to set up a 14-day calibration trial for HP Global Logistics. Let me know when you have 10 minutes to connect.

Best regards,

{SENDER_NAME}
Kalahari.ai Regulatory Intelligence
Mobile / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Gaborone, Botswana"""
    },
    {
        "id": "customs-03",
        "company": "Transport Holdings (Botswana)",
        "to": "sales@transportholdings.com",
        "track": "Customs",
        "subject": "Eliminating BURS Pre-Lodgment Penalties for Transport Holdings Haulage Fleet",
        "body": f"""Dear Transport Holdings Management,

Writing to your logistics division on Makgadigau Road in G-West Industrial regarding cross-border customs velocity for your heavy haulage and mining fleet.

For heavy freight arriving from South Africa, any delay in pre-lodging BURS SAD 500 customs entries triggers the BWP 10,000 statutory penalty per truck plus expensive fleet downtime at Tlokweng and Martins Drift. Manually entering 50+ line-item spare parts and industrial equipment invoices into BURS customs documentation remains a major operational vulnerability.

We built Kalahari.ai to solve this exact bottleneck. Our on-premise AI engine ingests multi-page commercial supplier invoices and generates compliant BURS SAD 500 clearance schedules with exact VDP, customs duties, and 14% VAT assessments in under 30 seconds per consignment.

Why this fits Transport Holdings:
- Speed: Converts 2-hour invoice captures into 30-second automated pre-lodgments.
- Heavy Industrial Support: Pre-calibrated for mining parts, industrial machinery, and automotive spares.
- Data Sovereignty: Strictly adheres to Section 74 of the Botswana Data Protection Act (DPA).

See our platform live: {PORTAL_URL}/customs

I would welcome the opportunity to discuss an enterprise integration for Transport Holdings. Are you available for a brief call this week?

Sincerely,

{SENDER_NAME}
Kalahari.ai | Autonomous Trade & Regulatory Systems
Tel/WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Plot 14407 Makgadigau Rd, Gaborone"""
    },
    {
        "id": "customs-04",
        "company": "Multi Task Distributors (Pty) Ltd",
        "to": "enquiries@multitaskmoving.co.bw",
        "track": "Customs",
        "subject": "Automated BURS Customs Schedules for Multi Task Moving (Commerce Park)",
        "body": f"""Dumelang Team Multi Task Distributors,

I am contacting your freight and moving division at Mathinthinyane Park in Gaborone International Commerce Park.

When handling international freight moving and commercial cargo consignments, cross-border packing lists and commercial invoices often contain hundreds of diverse household, commercial, and bonded items. Classifying these under BURS 8-digit HS tariff headings and calculating individual VDPs under tight pre-lodgment deadlines is time-consuming and risks the BWP 10,000 late pre-lodgment fine.

Kalahari.ai provides an automated customs extraction engine that reads commercial manifests and invoices, computes CIF/VDP values in Pula, applies SADC preferential duty rules, and outputs completed BURS SAD 500 dockets in Excel and JSON formats within seconds.

You can test the system with an actual cross-border commercial invoice on our portal:
{PORTAL_URL}/customs

We are offering freight forwarders in Commerce Park a complimentary 14-day calibration trial. I would appreciate 10 minutes to demonstrate how this can streamline your customs clearing desk.

Best regards,

{SENDER_NAME}
Kalahari.ai | Gaborone, Botswana
Direct: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-05",
        "company": "Cargo Junxion",
        "to": "forwarding@junxion-bw.com",
        "track": "Customs",
        "subject": "Tlokweng Border Rapid Pre-Lodgment Engine for Cargo Junxion",
        "body": f"""Good day Cargo Junxion Team,

Reaching out to your head office in Selokwana Ward, Tlokweng.

Operating right on the primary Tlokweng border corridor, your road express consolidation and freight forwarding operations experience the pressure of BURS mandatory pre-lodgment rules firsthand. When trucks reach Tlokweng without pre-approved customs documentation, the BWP 10,000 penalty and demurrage directly harm client retention.

Kalahari.ai was built specifically for road freight forwarders operating across the Zeerust-Tlokweng corridor. Our engine extracts multi-line cross-border commercial invoices in 30 seconds, generating:
- Full 8-digit BURS HS Tariff Code breakdowns
- Exact VDP conversions from ZAR/USD to BWP
- SADC Rules of Origin compliance verification
- One-click Excel (.xlsx) and ASYCUDA/CMS JSON EDI downloads

Take a look at the live platform here:
{PORTAL_URL}/customs

Could we schedule a quick 10-minute briefing at your Tlokweng office this Thursday or Friday to show you the engine in action?

Warm regards,

{SENDER_NAME}
Lead Architect | Kalahari.ai
Mobile/WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-06",
        "company": "OCA Clearing (Olorato Clearing Agent)",
        "to": "info@ocaclearing.com",
        "track": "Customs",
        "subject": "SAD 500 Clearance & T1 Transit Automation for OCA Clearing (Pioneer Gate / Mamuno)",
        "body": f"""Dumelang Olorato Clearing Agent Team,

Writing to your customs brokerage team serving Pioneer Border Gate and Mamuno.

With Pioneer Gate and Mamuno acting as essential gateways for South African imports and Trans-Kalahari freight from Namibia, preparing SAD 500 entry dockets and T1 transit paperwork under high volume is demanding. Delays in pre-lodging commercial entries risk severe BURS fines of BWP 10,000 per truck.

Kalahari.ai accelerates your border clearance throughput by automating invoice-to-SAD 500 conversion. Within 30 seconds of receiving a client's commercial invoice, our platform extracts all line items, applies correct tariff rates, verifies SADC certificate status, and produces ready-to-file BURS schedules.

Key features for OCA Clearing:
- Sub-30-second processing for multi-item invoices
- Automated calculation of Customs Duty and 14% Import VAT
- 100% compliant with the Botswana Data Protection Act (on-premise processing)

Test the live customs engine here:
{PORTAL_URL}/customs

I would love to set OCA Clearing up with a pilot at Pioneer Gate. Let me know when you are open for a brief call.

Warm regards,

{SENDER_NAME}
Kalahari.ai Regulatory Systems
Phone / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-07",
        "company": "Gateway Freight Forwarding & Clearing",
        "to": "info@gatewayfreight.co.bw",
        "track": "Customs",
        "subject": "Automating Container & Rail Customs Pre-Lodgment at Gabcon Freight Village",
        "body": f"""Good day Gateway Freight Team,

Writing to your operations office at Gabcon Freight Village (Office 206, Plot 14415) in G-West.

Managing multimodal rail and road container freight through Gabcon requires fast, error-free customs documentation. When South African supplier invoices arrive with dozens of mixed product codes, manual data capture into BURS CMS creates major operational friction and exposes consignments to late-lodgment penalties.

Kalahari.ai provides an autonomous pre-lodgment pipeline designed for container forwarders:
- Instant ingestion of foreign invoices (ZAR / USD / EUR)
- Automated conversion to Botswana Pula VDP
- BURS 8-digit tariff code mapping and SADC 0% duty vs. MFN duty verification
- Instant export to BURS-ready Excel spreadsheets and JSON EDI

See the tool operational on our portal:
{PORTAL_URL}/customs

We are offering Gabcon-based clearing agents a 14-day zero-cost calibration period. Would you be open to a 10-minute demonstration at your Gabcon office this week?

Kind regards,

{SENDER_NAME}
Kalahari.ai Document Intelligence
Mobile: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Gaborone, Botswana"""
    },
    {
        "id": "customs-08",
        "company": "Zebra Shipping (Pty) Ltd",
        "to": "admin@zebrashipping.co.bw",
        "track": "Customs",
        "subject": "BURS Customs Brokerage Automation for Zebra Shipping (Takatokwane Way)",
        "body": f"""Dear Zebra Shipping Management,

I am contacting your team at Takatokwane Way in Gaborone West Industrial Area.

As one of Botswana's established freight forwarding and customs clearing agents, your clearing desk handles complex international manifests from Durban, Walvis Bay, and OR Tambo. Transcribing multi-page supplier invoices into BURS SAD 500 entries while ensuring zero-tariff discrepancy remains one of the highest manual labor costs in freight management.

Kalahari.ai automates this extraction and assessment workflow:
1. Drag and drop any supplier invoice PDF or scan.
2. In 30 seconds, receive full HS tariff classification, VDP assessment in BWP, SADC certificate checks, and 14% VAT calculations.
3. Download completed BURS SAD 500 Excel workbooks and JSON EDI files ready for lodgment.
4. Total compliance with Botswana Data Protection Act 2024 Section 74 (no data sent to foreign cloud servers).

Evaluate the live engine here:
{PORTAL_URL}/customs

I would be pleased to demonstrate the platform for Zebra Shipping this week. Please let me know your availability.

Best regards,

{SENDER_NAME}
Kalahari.ai
WhatsApp / Mobile: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-09",
        "company": "Manica Botswana (Pty) Ltd",
        "to": "manica@info.bw",
        "track": "Customs",
        "subject": "Pre-Lodgment SAD 500 Acceleration for Manica Botswana (Kamushongu Rd)",
        "body": f"""Good day Manica Botswana Freight Operations,

Writing to your team at Plot 14452 on Kamushongu Road in G-West Industrial.

With Manica managing high-value multimodal logistics across both the southern border posts and the northern corridor through Francistown and Ramokgwebana, customs processing speed is essential to fleet turnaround. Under BURS pre-lodgment rules, delays in submitting SAD 500 documentation create substantial risk of BWP 10,000 penalties per truckload.

Kalahari.ai has engineered an automated customs declaration engine tailored to high-volume cross-border forwarders in Botswana:
- Extracts line items, descriptions, and values from supplier invoices in 30 seconds.
- Computes VDP, customs duty, and 14% VAT with zero mathematical error.
- Fully offline edge AI inference that strictly satisfies Section 74 of the Botswana DPA.
- Generates official BURS SAD 500 declaration dockets in .xlsx and .json format.

You can inspect the platform live:
{PORTAL_URL}/customs

I would appreciate the chance to present a brief 10-minute briefing to your customs department. Could we connect this week?

Kind regards,

{SENDER_NAME}
Lead Regulatory Architect | Kalahari.ai
Contact: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-10",
        "company": "DSV Botswana",
        "to": "botswanadsv@bw.dsv.com",
        "track": "Customs",
        "subject": "Autonomous BURS Customs Docket Generation for DSV Botswana (Commerce Park)",
        "body": f"""Dear DSV Botswana Customs & Freight Division,

Reaching out to your commercial operations team at Plot 43 in Gaborone International Commerce Park.

In handling global air, ocean, and regional road freight for multinational accounts in Botswana, your clearing desk deals with large multi-line supplier invoices. Manually capturing these entries into BURS CMS while meeting strict pre-lodgment deadlines to avoid the BWP 10,000 penalty requires significant staff hours.

Kalahari.ai provides an on-premise AI pipeline built specifically for Botswana freight forwarders:
- Automates commercial invoice transcription into BURS SAD 500 line items in under 30 seconds.
- Calculates VDP in Pula, evaluates SADC preferential rates vs MFN duty, and computes 14% import VAT.
- Eliminates cross-border data privacy liabilities under Section 74 of the Botswana Data Protection Act.
- Exports structured schedules directly in Excel and ASYCUDA-compatible JSON format.

Experience our live engine:
{PORTAL_URL}/customs

I would welcome 10 minutes to demonstrate how Kalahari.ai can support DSV's customs operations in Gaborone.

Warm regards,

{SENDER_NAME}
Kalahari.ai Document Solutions
Tel/WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Gaborone, Botswana"""
    },
    {
        "id": "customs-11",
        "company": "DHL Global Forwarding Botswana",
        "to": "enquiries@dhl.co.bw",
        "track": "Customs",
        "subject": "Automating BURS SAD 500 Pre-Lodgments for DHL Global Forwarding (Broadhurst)",
        "body": f"""Dear DHL Global Forwarding Botswana Team,

I am writing to your operations office at Plot 20700 in Broadhurst Industrial regarding BURS pre-lodgment customs optimization.

For DHL's time-critical cross-border road express and international freight, any delay in lodging customs entries before border arrival risks the statutory BWP 10,000 BURS pre-lodgment non-compliance fine and border holding costs. Manually checking 8-digit HS tariff classifications across multi-item supplier shipments is a major bottleneck.

Kalahari.ai is an on-premise document intelligence platform built in Gaborone. It reads foreign commercial invoices, extracts individual consignments, computes Botswana Pula VDP, applies SADC preferential trade rules, and exports completed BURS SAD 500 schedules in under 30 seconds.

Our platform guarantees 100% compliance with Section 74 of the Botswana Data Protection Act (DPA 2024), ensuring zero foreign cloud data leakage.

Test the live interface here:
{PORTAL_URL}/customs

I would be delighted to arrange a brief technical pilot for DHL Global Forwarding. Let me know your availability for a 10-minute discussion.

Best regards,

{SENDER_NAME}
Kalahari.ai | Gaborone, Botswana
Direct: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-12",
        "company": "AGS Frasers Botswana",
        "to": "sales@agsfrasers.co.bw",
        "track": "Customs",
        "subject": "Streamlining Cross-Border Customs Clearance for AGS Frasers (New Lobatse Rd)",
        "body": f"""Dumelang AGS Frasers Team,

Writing to your team at Plot 14398 on New Lobatse Road in G-West Industrial.

In international removals and freight forwarding, handling extensive personal and commercial inventories for BURS clearance requires intensive line-by-line documentation. Under BURS pre-lodgment rules, failing to lodge cleared SAD 500 documents prior to border arrival carries a BWP 10,000 fine per container.

Kalahari.ai accelerates this workflow:
- Automatically reads supplier invoices and manifests into structured BURS line items.
- Computes duty, VDP, and 14% VAT in Pula in under 30 seconds.
- Provides immediate Excel (.xlsx) and JSON EDI downloads for direct submission to BURS CMS.

Review our platform live:
{PORTAL_URL}/customs

We are offering G-West clearing firms a 14-day calibration trial. Let me know if you are open to a 10-minute overview this week.

Sincerely,

{SENDER_NAME}
Lead Architect | Kalahari.ai
Mobile/WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-13",
        "company": "Sky Bridge Logistics",
        "to": "info@skybridge.co.bw",
        "track": "Customs",
        "subject": "Pre-Lodgment Clearance Automation for Sky Bridge Logistics (Gaborone & Francistown)",
        "body": f"""Good day Sky Bridge Logistics Operations,

Contacting your dual-hub freight forwarding teams in G-West Industrial (Gaborone) and Francistown.

Operating across both the Tlokweng and Ramokgwebana trade corridors, your customs agents face continuous pressure to pre-lodge SAD 500 entries before trucks reach the border. The BURS BWP 10,000 pre-lodgment penalty makes rapid turnaround essential for your transport margins.

Kalahari.ai solves this by converting foreign commercial invoices into compliant BURS SAD 500 declarations in 30 seconds:
- Automated 8-digit HS tariff assignment and SADC zero-duty checking.
- Automated ZAR/USD to BWP VDP calculation.
- Instant download of completed BURS-ready Excel and JSON files.
- Fully sovereign, offline edge AI complying with Botswana DPA Section 74.

Explore the operational system live:
{PORTAL_URL}/customs

I would welcome 10 minutes to demonstrate the platform to your Gaborone or Francistown team. When is a convenient time to connect?

Warm regards,

{SENDER_NAME}
Kalahari.ai Regulatory Intelligence
Direct: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-14",
        "company": "Advance Freight Services (Pty) Ltd",
        "to": "gsburt@it.bw",
        "track": "Customs",
        "subject": "BURS SAD 500 Automation for Advance Freight Services (Broadhurst Industrial)",
        "body": f"""Dear Advance Freight Services Team,

Writing to your customs brokerage office at Plot 20731 on Pharathe Crescent in Broadhurst Industrial.

Customs tariff consulting and cross-border road freight clearing demand precision, but manual invoice transcription into BURS CMS remains time-consuming. With BURS strictly enforcing pre-lodgment deadlines backed by BWP 10,000 non-compliance fines, automated clearance docket generation is a decisive competitive edge.

Kalahari.ai processes multi-item commercial invoices in under 30 seconds:
- Automatically validates HS tariff codes and SADC rules of origin.
- Computes VDP, customs duty, and 14% VAT in Botswana Pula.
- Exports structured BURS SAD 500 Excel workbooks and JSON EDI files ready for lodgment.

Test the system on our live portal:
{PORTAL_URL}/customs

We would be pleased to set up Advance Freight Services with a 14-day zero-cost trial. Could we schedule a 10-minute discussion this week?

Kind regards,

{SENDER_NAME}
Kalahari.ai
WhatsApp / Mobile: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-15",
        "company": "BMR Freight Services",
        "to": "bmrfreight@bbi.co.bw",
        "track": "Customs",
        "subject": "Eliminating Pre-Lodgment Delays for BMR Freight Services (Thito House)",
        "body": f"""Dumelang BMR Freight Services Management,

Reaching out to your clearing division at Thito House on Nakedi Road in Broadhurst Industrial.

For BMR's cross-border SADC road haulage and bonded cargo operations, clearing trucks before they hit Tlokweng or Martins Drift is vital to avoid the BWP 10,000 BURS pre-lodgment failure fine and expensive border demurrage.

Kalahari.ai automates the entire invoice-to-SAD 500 declaration process:
1. Ingest foreign supplier invoices (PDF or scan).
2. Automatically extract line items, calculate Pula VDP, verify SADC preferential status, and calculate 14% VAT.
3. Download completed BURS SAD 500 Excel sheets and ASYCUDA JSON EDI files in under 30 seconds.

See the engine running live:
{PORTAL_URL}/customs

I would welcome 10 minutes to walk your clearing team through a live demonstration. Let me know when you are available.

Warm regards,

{SENDER_NAME}
Lead Regulatory Solutions Architect | Kalahari.ai
Tel/WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-16",
        "company": "Estamok Freight (Pty) Ltd",
        "to": "estamok@gmail.com",
        "track": "Customs",
        "subject": "Fast-Track BURS Pre-Lodgment for Estamok Freight (Mokolwane Rd)",
        "body": f"""Good day Estamok Freight Team,

Writing to your team at Plot 10200 on Mokolwane Road in Broadhurst Industrial.

In managing road haulage cargo and customs clearance, manually typing long supplier invoices into BURS customs schedules slows down your operations and leaves consignments vulnerable to the BWP 10,000 late pre-lodgment penalty.

Kalahari.ai transforms any commercial invoice into a verified BURS SAD 500 declaration in 30 seconds:
- Automatically classifies items under 8-digit HS Tariff Codes.
- Accurately converts currency and computes VDP, Duty, and 14% VAT.
- Generates official BURS Excel (.xlsx) and JSON files for one-click filing.
- Runs 100% on local hardware, meeting Section 74 of the Botswana Data Protection Act.

Test the live portal here:
{PORTAL_URL}/customs

I would be happy to set you up with a free 14-day calibration trial. Let me know if you have 10 minutes for a quick call.

Best regards,

{SENDER_NAME}
Kalahari.ai Document Systems
Contact / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-17",
        "company": "ACS Global Forwarding",
        "to": "vijayrp@acsglobal.co.bw",
        "track": "Customs",
        "subject": "Automating Multi-Item Customs Declarations for ACS Global Forwarding (Commerce Park)",
        "body": f"""Dear ACS Global Forwarding Operations,

Contacting your team at Plot 173, Unit 3 in Gaborone International Commerce Park.

For ACS Global's LCL/FCL consolidation and international forwarding operations, commercial invoices containing dozens of assorted line items represent a major clearing bottleneck. Ensuring exact HS code mapping and Pula VDP calculations under tight BURS pre-lodgment timelines is essential to avoid the BWP 10,000 statutory fine.

Kalahari.ai is an AI customs engine built in Botswana that automates this workflow in 30 seconds:
- Extracts multi-line commercial invoices with 99.4% field accuracy.
- Evaluates SADC 0% duty vs. MFN tariff rates and calculates 14% Import VAT.
- Exports ready-to-file BURS SAD 500 Excel spreadsheets and ASYCUDA JSON EDI.
- Full compliance with Botswana DPA Section 74 cross-border data transfer rules.

Experience the live system:
{PORTAL_URL}/customs

I would welcome 10 minutes to discuss how Kalahari.ai can accelerate your customs clearing throughput.

Kind regards,

{SENDER_NAME}
Kalahari.ai Regulatory Intelligence
Mobile/WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-18",
        "company": "Elliott Forwarding (Pty) Ltd",
        "to": "gaborone@elliott.co.bw",
        "track": "Customs",
        "subject": "Accelerating BURS Customs Pre-Lodgment for Elliott Forwarding (Western Industrial)",
        "body": f"""Dumelang Elliott Forwarding Team,

Writing to your customs brokerage division at Plot 22098/4/B/2 in Western Industrial Estate, G-West.

Managing cross-border commercial consignments requires fast turnaround to keep client cargo moving and avoid BURS pre-lodgment non-compliance fines of BWP 10,000 per shipment. Manual data capture of multi-item foreign supplier invoices is one of the highest friction points for your staff.

Kalahari.ai automates this process:
- Converts complex supplier invoices into verified BURS SAD 500 schedules in 30 seconds.
- Accurately computes VDP in Botswana Pula, verifies SADC preferential rates, and assesses 14% VAT.
- One-click export to BURS-compliant Excel (.xlsx) and JSON EDI formats.

Try the live engine with a sample invoice:
{PORTAL_URL}/customs

Could we schedule a quick 10-minute briefing at your G-West office this week?

Warm regards,

{SENDER_NAME}
Lead Regulatory Solutions Architect | Kalahari.ai
Direct / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-19",
        "company": "Clakho Import & Export (Pty) Ltd",
        "to": "clakho@mega.bw",
        "track": "Customs",
        "subject": "Customs SAD 500 Automation for Clakho Import & Export (G-West Industrial)",
        "body": f"""Good day Clakho Import & Export Team,

Reaching out to your operations office at Plot 22056/7 in G-West Industrial.

As an import/export and customs clearing agency, processing commercial manifests accurately before cargo arrives at Tlokweng or Pioneer Gate is critical to avoiding BURS BWP 10,000 pre-lodgment failure penalties.

Kalahari.ai generates compliant BURS SAD 500 customs declarations in 30 seconds:
- Automatically maps 8-digit HS tariff classifications.
- Calculates VDP, customs duty, and 14% VAT in Botswana Pula.
- Generates downloadable Excel (.xlsx) and JSON EDI dockets ready for BURS CMS submission.
- Operates locally inside Botswana in full compliance with the Data Protection Act (DPA).

See the live tool here:
{PORTAL_URL}/customs

I would be pleased to provide your team with a 14-day calibration trial. Let me know when you have 10 minutes to connect.

Best regards,

{SENDER_NAME}
Kalahari.ai Document Intelligence
Tel/WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "customs-20",
        "company": "Kya Sands Transport Ltd",
        "to": "khayasands@ftnet.co.bw",
        "track": "Customs",
        "subject": "Northern Corridor BURS Pre-Lodgment Automation for Kya Sands Transport (Francistown)",
        "body": f"""Dear Kya Sands Transport Team,

I am writing to your haulage and clearing operations at Dumela Industrial Sites in Francistown.

Operating heavy freight along the Francistown, Martins Drift, and Ramokgwebana northern transport corridors, pre-lodging BURS customs paperwork before trucks hit border posts is essential to prevent costly BWP 10,000 fines and demurrage.

Kalahari.ai was built to automate the commercial invoice-to-SAD 500 pipeline:
- Ingests foreign cross-border invoices and extracts all line items in 30 seconds.
- Calculates VDP in Pula, confirms SADC preferential trade duty status, and computes 14% VAT.
- One-click download of BURS-compliant Excel (.xlsx) and JSON EDI files.
- 100% compliant with Section 74 of the Botswana Data Protection Act.

Test the live portal here:
{PORTAL_URL}/customs

I would welcome 10 minutes to demonstrate how this can streamline your northern corridor clearing operations.

Kind regards,

{SENDER_NAME}
Lead Regulatory Solutions Architect | Kalahari.ai
Mobile / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Gaborone & Francistown Network"""
    },

    # --------------------------------------------------------------------------
    # TRACK 2: COMMERCIAL CONTRACTORS & PPRA BIDDERS
    # --------------------------------------------------------------------------
    {
        "id": "tenders-01",
        "company": "Stefanutti Stocks (Botswana) (Pty) Ltd",
        "to": "receptionbotswana@stefstocks.com",
        "track": "Tenders",
        "subject": "Botswana Friday Tender Radar: Civil Engineering Opportunities (Code 01 / Code 03)",
        "body": f"""Dear Stefanutti Stocks Botswana Management,

I am writing to your commercial bidding division at Plot 21307 in Phakalane Industrial.

Every Friday at 15:00 CAT, the Republic of Botswana publishes high-value civil engineering, bridge, and infrastructure tenders in the Government Gazette Extraordinary. Missing an emergency tender notice or overlooking a compulsory site inspection date (often scheduled within days of publication) leads to automatic bid disqualification on multi-million Pula projects.

Kalahari.ai operates an autonomous weekly intelligence engine:
- Ingests the Gazette Tender Supplement every Friday afternoon.
- Filters tenders specifically for PPRA Code 01 (Building Construction) and Code 03 (Civil Engineering, Roads & Bridges).
- Highlights critical compliance constraints: compulsory site meetings, citizen reservation policies, tender fees, and bid bond amounts.
- Delivers a structured Excel dossier and instant WhatsApp briefing before 17:00 CAT every Friday.

Explore our active tender radar live:
{PORTAL_URL}/tenders

We are offering Stefanutti Stocks a complimentary 1-month briefing trial. I would be glad to discuss your target PPRA categories.

Warm regards,

{SENDER_NAME}
Lead Architect | Kalahari.ai Friday Tender Radar
Direct / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Gaborone, Botswana"""
    },
    {
        "id": "tenders-02",
        "company": "Estate Construction (Pty) Ltd",
        "to": "reception@estateconstruction.co.bw",
        "track": "Tenders",
        "subject": "Friday Tender Radar: PPRA Code 03 Civil Engineering Opportunities for Estate Construction",
        "body": f"""Dumelang Estate Construction Estimating Team,

Writing to your offices at Plot 64268/9 in Block 3 Industrial, Gaborone.

As one of Botswana's leading civil engineering contractors, Estate Construction regularly bids on major road, bridge, and earthworks projects issued by the Ministry of Transport & Public Works and local district councils. In the Friday Government Gazette, noticing tenders late or missing a compulsory site inspection venue can disqualify a bid before estimation even begins.

Kalahari.ai delivers a specialized Friday intelligence service tailored to PPRA Code 03:
- Ingests the Government Gazette every Friday at 15:00 CAT.
- Automatically isolates all Code 03 road, water reticulation, and civil works tenders.
- Flags compulsory site inspection dates, venues, and bid bond requirements.
- Provides a clean, filtered Excel dossier ready for your estimating department by 17:00 CAT.

View current live tenders on our platform:
{PORTAL_URL}/tenders

I would welcome 5 minutes to confirm your preferred WhatsApp recipients for our Friday 17:00 CAT tender dossier.

Best regards,

{SENDER_NAME}
Kalahari.ai Procurement Intelligence
Tel / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-03",
        "company": "Bothakga Burrow Botswana (Pty) Ltd",
        "to": "bbbl@bbbl.co.bw",
        "track": "Tenders",
        "subject": "Friday Government Gazette Infrastructure Tender Intelligence for Bothakga Burrow",
        "body": f"""Dear Bothakga Burrow Engineering Team,

Writing to your consultancy office at Millennium Office Park (Plot 115, Unit 24, Kgale Mews) in Gaborone.

For engineering consultancies bidding on public civil infrastructure and structural works under PPRA Code 03, identifying project notices the moment they appear in the Government Gazette is critical to assembling consortiums and preparing technical proposals.

Kalahari.ai operates an autonomous Friday Tender Radar:
- Analyzes the Government Gazette Extraordinary every Friday at 15:00 CAT.
- Delivers an executive briefing of infrastructure, civil engineering, and feasibility studies.
- Details all client submission deadlines, bid bonds, and mandatory pre-bid meetings.
- Allows your team to star, track, and export tenders directly into Excel.

Explore the active tender board:
{PORTAL_URL}/tenders

We would be pleased to enroll Bothakga Burrow in our Friday tender distribution for October. Let me know who in your business development team should receive the weekly briefing.

Kind regards,

{SENDER_NAME}
Kalahari.ai
Mobile / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-04",
        "company": "Unik Construction Engineering",
        "to": "unik@unikconst.com",
        "track": "Tenders",
        "subject": "Early Tender Alerts for Unik Construction: PPRA Code 03 Civil & Roads Opportunities",
        "body": f"""Good day Unik Construction Bidding Team,

Contacting your offices at Plot 61747 in G-West Industrial, Gaborone.

For major infrastructure contractors bidding across Botswana, early notice of Government Gazette tenders provides the vital lead time needed to calculate bills of quantities and secure bid securities. Compulsory site meetings are frequently scheduled within 10 days of gazetting, making early detection critical.

Kalahari.ai delivers real-time procurement intelligence:
- Autonomous ingestion of the Government Gazette every Friday at 15:00 CAT.
- Filtered specifically for PPRA Code 03 (Civil Engineering, Roads, Bridges & Earthworks).
- Priority alerts on compulsory site visit dates, locations, and tender fee requirements.
- Clean Excel export for your commercial estimators.

Inspect our live tender radar here:
{PORTAL_URL}/tenders

We can activate your Friday 17:00 CAT briefing immediately. Let me know who from your commercial department should be included.

Warm regards,

{SENDER_NAME}
Kalahari.ai | Gaborone, Botswana
Contact: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-05",
        "company": "Asphalt Botswana (Pty) Ltd",
        "to": "info@asphaltbotswana.co.bw",
        "track": "Tenders",
        "subject": "Targeted Friday Tender Radar for Asphalt Botswana (Code 03 Surfacing & Civil Works)",
        "body": f"""Dumelang Asphalt Botswana Management,

Writing to your team at Plot 22078/9 on Ditshoswane Road in G-West Industrial.

As a specialist in asphalt surfacing, road rehabilitation, and civil works, staying ahead of municipal and ministerial road tenders published in the Friday Government Gazette is crucial for planning plant utilization and material procurement.

Kalahari.ai monitors and filters the Gazette every Friday at 15:00 CAT:
- Delivers an alert covering all PPRA Code 03 surfacing, asphalt, and civil projects.
- Flags compulsory site meetings, closing dates, and citizen reservation requirements.
- Generates a downloadable Excel tender dossier for your commercial estimators.

View our operational platform:
{PORTAL_URL}/tenders

We are offering Asphalt Botswana a 30-day trial of our weekly Friday tender intelligence service. I would appreciate 5 minutes to confirm your setup.

Best regards,

{SENDER_NAME}
Lead Regulatory Architect | Kalahari.ai
Mobile/WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-06",
        "company": "Sharps Electrical (Pty) Ltd",
        "to": "pshailendra@sharps.co.bw",
        "track": "Tenders",
        "subject": "Friday Tender Radar: PPRA Code 02 Electrical Engineering Tenders for Sharps Electrical",
        "body": f"""Dear Sharps Electrical Commercial Team,

I am writing to your office on Haile Selassie Road in Gaborone Old Industrial Area.

High-value public electrical engineering tenders—spanning BPC substations, solar mini-grids, municipal reticulation, and hospital electrical installations under PPRA Code 02—appear regularly in the Friday Government Gazette. Overlooking a compulsory site inspection or a short-fuse tender closing date means missing major contract opportunities.

Kalahari.ai filters and compiles the Gazette every Friday afternoon:
- Automatically tracks all PPRA Code 02 (Electrical Engineering & Substations) tenders.
- Highlights compulsory site inspections, bid bond values, and citizen reservation preferences.
- Delivers an executive briefing and filtered Excel dossier every Friday before 17:00 CAT.

Inspect the live tender feed:
{PORTAL_URL}/tenders

We are happy to set Sharps Electrical up on our Friday alert distribution. Please let me know the best email and WhatsApp coordinates for your bidding department.

Kind regards,

{SENDER_NAME}
Kalahari.ai Procurement Systems
Direct / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-07",
        "company": "Bokone Reticulation & Electrical Systems (BRES)",
        "to": "bres@btcmail.co.bw",
        "track": "Tenders",
        "subject": "Targeted Electrical Tenders (Code 02) for BRES from the Friday Gazette",
        "body": f"""Dumelang Team BRES,

Reaching out to your offices at Plot 22108, Unit 5 in G-West Industrial.

For powerline contracting and reticulation specialists, tracking rural electrification, BPC line extensions, and government electrical maintenance tenders published in the Friday Gazette requires continuous monitoring. Missing a mandatory site inspection automatically disqualifies your bid.

Kalahari.ai provides a Friday Tender Radar built for electrical contractors:
- Scans the Government Gazette Extraordinary every Friday at 15:00 CAT.
- Extracts all PPRA Code 02 tenders directly into a filtered briefing.
- Details mandatory site visit dates, locations, and bid bond amounts.
- Exports a structured Excel sheet directly to your desk.

View the active radar:
{PORTAL_URL}/tenders

Let us send you this Friday's filtered electrical tender brief. Please confirm if this is the ideal email for your commercial team.

Warm regards,

{SENDER_NAME}
Kalahari.ai
Contact: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-08",
        "company": "Chandie Electrical Engineers",
        "to": "info@chanelecteng.co.bw",
        "track": "Tenders",
        "subject": "Friday Tender Radar: Substation & Commercial Electrical Contracting (PPRA Code 02)",
        "body": f"""Good day Chandie Electrical Engineers Team,

Writing to your office at Plot 21314, Unit 5 in Phakalane Industrial.

Every week, parastatals and government ministries publish tenders for electrical maintenance, commercial installations, and substations in the Friday Government Gazette. Bidding teams often lose valuable preparation days manually sifting through hundreds of pages of gazetted text.

Kalahari.ai automates this extraction:
- Filters Gazette notices every Friday at 15:00 CAT specifically for PPRA Code 02.
- Flags compulsory site inspections, citizen ownership thresholds, and bid bond terms.
- Delivers a clean Excel summary and WhatsApp briefing by 17:00 CAT.

Explore our active tender feed:
{PORTAL_URL}/tenders

We would be pleased to enroll Chandie Electrical in a complimentary trial for October. Let me know who should receive the weekly dossier.

Best regards,

{SENDER_NAME}
Lead Regulatory Solutions Architect | Kalahari.ai
Tel/WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-09",
        "company": "Mod Controls (Botswana)",
        "to": "modiri@modcontrols.co.bw",
        "track": "Tenders",
        "subject": "Instrumentation & Electrical Tenders (Code 01/02) for Mod Controls",
        "body": f"""Dumelang Rre Modiri / Mod Controls Team,

Reaching out to your offices in Gaborone (Plot 2930, Ext 10) and Mahalapye.

For instrumentation, control systems, and specialized electrical engineering contracts, identifying relevant tenders in the Government Gazette early gives you the required lead time to prepare competitive technical proposals and secure manufacturer authorizations.

Kalahari.ai's Friday Tender Radar:
- Ingests the Gazette Extraordinary every Friday at 15:00 CAT.
- Automatically categorizes Code 01 and Code 02 electrical and instrumentation tenders.
- Verifies compulsory site inspection dates and venues to avoid missed meetings.
- Provides one-click Excel downloads for your estimating team.

See current tenders on our platform:
{PORTAL_URL}/tenders

I would be glad to add Mod Controls to our Friday 17:00 CAT tender distribution. Let me know if you would like to test it this week.

Kind regards,

{SENDER_NAME}
Kalahari.ai
Mobile / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-10",
        "company": "Wellfield Consulting Services",
        "to": "info@wellfield.co.bw",
        "track": "Tenders",
        "subject": "Friday Tender Radar: Hydrogeology, Borehole & Water Works (PPRA Code 10)",
        "body": f"""Dear Wellfield Consulting Services Team,

Writing to your consultancy team at Sediba House (Plot 20691) in Block 3 Industrial, Gaborone.

Water resource development, groundwater exploration, and borehole drilling tenders under PPRA Code 10 published by the Water Utilities Corporation (WUC) and the Ministry of Lands & Water Affairs require prompt mobilization for field inspections and geotechnical reviews.

Kalahari.ai provides a weekly Friday procurement intelligence service:
- Scans the Government Gazette every Friday at 15:00 CAT.
- Extracts all PPRA Code 10 water engineering, hydrogeology, and borehole tenders.
- Highlights compulsory site visit coordinates, bid securities, and submission venues.
- Delivers an executive briefing and Excel dossier before close of business Friday.

View our live platform:
{PORTAL_URL}/tenders

We would be pleased to enroll Wellfield Consulting in a 30-day trial of our weekly water sector procurement feed. Please let me know who in your team should receive the updates.

Warm regards,

{SENDER_NAME}
Kalahari.ai
Tel / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-11",
        "company": "Water Surveys (Botswana) (Pty) Ltd",
        "to": "wsb@it.bw",
        "track": "Tenders",
        "subject": "Early Tender Detection for Water Surveys Botswana: PPRA Code 10 Groundwater Opportunities",
        "body": f"""Good day Water Surveys Botswana Team,

Contacting your offices at Plot 13131 in Broadhurst, Gaborone.

Tracking public groundwater exploration, borehole siting, and test-pumping tenders published in the Friday Government Gazette is crucial for your drilling and geophysical fleet planning. Missing a gazetted pre-tender site inspection leads to immediate disqualification.

Kalahari.ai delivers weekly automated procurement alerts:
- Ingests the Gazette every Friday at 15:00 CAT.
- Isolates all PPRA Code 10 tenders (Groundwater, Siting & Drilling).
- Highlights site meeting dates, locations, and bid bond amounts.
- Exports a clean, filtered Excel sheet for your technical managers.

Check out our active tender radar:
{PORTAL_URL}/tenders

Let us include Water Surveys Botswana in this Friday's 17:00 CAT alert. Please confirm your preferred contact details.

Kind regards,

{SENDER_NAME}
Lead Regulatory Solutions Architect | Kalahari.ai
Mobile: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-12",
        "company": "Geoflux (Pty) Ltd",
        "to": "info@geoflux.co.bw",
        "track": "Tenders",
        "subject": "Targeted Water & Geotechnical Tender Intelligence for Geoflux (Gaborone & Francistown)",
        "body": f"""Dear Geoflux Management,

Writing to your team at Plot 10224 on Mokolwane Road in Broadhurst Industrial.

For multidisciplinary environmental, geotechnical, and water resources consultancies operating across Gaborone and Francistown, identifying government expressions of interest and tenders under PPRA Code 10 the moment they are published is essential to consortium assembly.

Kalahari.ai delivers a Friday Tender Radar service:
- Analyzes the Government Gazette Tender Supplement every Friday afternoon.
- Extracts all PPRA Code 10 and environmental engineering tenders.
- Details all compulsory pre-bid conference dates, locations, and submission deadlines.
- Delivers an executive briefing and Excel dossier by 17:00 CAT every Friday.

Explore the live feed:
{PORTAL_URL}/tenders

We are happy to provide Geoflux with a complimentary 1-month trial. Let me know the best email addresses for your business development team.

Warm regards,

{SENDER_NAME}
Kalahari.ai Procurement Intelligence
Tel / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-13",
        "company": "Groundwater Technology (Botswana) Ltd",
        "to": "info@groundwater.co.bw",
        "track": "Tenders",
        "subject": "Friday Tender Radar: Borehole Drilling & Water Infrastructure (PPRA Code 10)",
        "body": f"""Dumelang Groundwater Technology Team,

Writing to your office at Plot 22072 in G-West Industrial.

Public borehole drilling and water reticulation tenders across the Central, Kgalagadi, and Chobe districts require early operational planning. Compulsory site meetings in remote locations are often scheduled within days of the Friday Gazette release.

Kalahari.ai ensures you never miss an opportunity:
- Automatically extracts Code 10 water and drilling tenders from the Friday Gazette.
- Flags compulsory site visit coordinates, dates, and bid security terms.
- Sends an executive dossier and Excel file directly to your team by 17:00 CAT.

View the active tender feed:
{PORTAL_URL}/tenders

I would be pleased to enroll Groundwater Technology in our weekly Friday tender distribution. Let me know if you would like to test it this week.

Sincerely,

{SENDER_NAME}
Kalahari.ai
WhatsApp / Mobile: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-14",
        "company": "Kalahari Medical Distributors (KMD)",
        "to": "info@kmd.co.bw",
        "track": "Tenders",
        "subject": "Friday Tender Radar: Ministry of Health Medical Supplies (PPRA Code 211) for KMD",
        "body": f"""Dear Kalahari Medical Distributors Commercial Team,

Contacting your team at Plot 25001 on Makgadigau Road in G-West Industrial.

The Ministry of Health, Central Medical Stores (CMS), and district hospital facilities regularly publish large procurement tenders for medical equipment, diagnostics, and pharmaceutical supplies under PPRA Code 211 in the Friday Government Gazette. Having immediate visibility on citizen reservation margins and bid security requirements is vital to preparing winning bids.

Kalahari.ai operates an automated procurement alert service:
- Scans the Government Gazette Extraordinary every Friday at 15:00 CAT.
- Automatically compiles all PPRA Code 211 medical, hospital equipment, and supplies tenders.
- Highlights closing dates, bid bonds, and packaging/sample specifications.
- Delivers a structured Excel dossier every Friday before 17:00 CAT.

Explore our active tender radar:
{PORTAL_URL}/tenders

We are offering KMD a 1-month trial of our Friday healthcare tender feed. Let me know who in your commercial department should receive the briefing.

Warm regards,

{SENDER_NAME}
Kalahari.ai Procurement Intelligence
Tel / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Gaborone, Botswana"""
    },
    {
        "id": "tenders-15",
        "company": "Pharma Vision (Pty) Ltd",
        "to": "info@pharmavision.co.bw",
        "track": "Tenders",
        "subject": "Friday Tender Radar: Healthcare & Pharmaceutical Bidding (PPRA Code 211)",
        "body": f"""Good day Pharma Vision Team,

Writing to your offices at Plot 102, Unit 8 in Gaborone International Commerce Park.

Tracking public healthcare tenders from Central Medical Stores and district health management teams in the Friday Gazette requires continuous monitoring. Bidding timelines are tight, and missing a notification means losing out on high-value pharmaceutical and consumable contracts.

Kalahari.ai delivers a specialized healthcare tender radar:
- Ingests the Government Gazette every Friday at 15:00 CAT.
- Gathers all PPRA Code 211 tenders for pharmaceuticals, reagents, and clinical consumables.
- Outlines tender fees, bid bonds, and citizen reservation requirements.
- Delivers an actionable Excel dossier every Friday by 17:00 CAT.

Review current tenders live:
{PORTAL_URL}/tenders

We would be pleased to enroll Pharma Vision in a complimentary trial for October. Please confirm your preferred email for the weekly briefing.

Kind regards,

{SENDER_NAME}
Lead Regulatory Solutions Architect | Kalahari.ai
Mobile / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-16",
        "company": "Mediland Healthcare Distributors",
        "to": "info@mediland.co.bw",
        "track": "Tenders",
        "subject": "Early Tender Detection for Mediland Healthcare: PPRA Code 211 Hospital Supplies",
        "body": f"""Dumelang Mediland Healthcare Team,

Reaching out to your commercial division at Unit 1, Plot 100 in Gaborone International Commerce Park.

For distributors of medical reagents, hospital equipment, and diagnostic consumables, rapid response to ministerial and institutional healthcare tenders in the Friday Gazette provides the necessary lead time to secure manufacturer authorizations and pricing.

Kalahari.ai automates this procurement intelligence:
- Extracts all PPRA Code 211 tenders from the Friday Gazette at 15:00 CAT.
- Details all critical requirements: closing dates, venues, bid bond values, and citizen preferences.
- Provides a clean, filtered Excel dossier ready for your sales directors by 17:00 CAT.

View the active platform:
{PORTAL_URL}/tenders

Let us add Mediland Healthcare to this Friday's 17:00 CAT distribution. Let me know if you would like to test the feed this week.

Best regards,

{SENDER_NAME}
Kalahari.ai
Direct: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-17",
        "company": "Fine Pharmaceuticals (Pty) Ltd",
        "to": "admin@finepharma.co.bw",
        "track": "Tenders",
        "subject": "Targeted Gazette Healthcare Tenders (PPRA Code 211) for Fine Pharmaceuticals",
        "body": f"""Dear Fine Pharmaceuticals Bidding Team,

Contacting your offices at Plot 69365, Unit 3 in Western Industrial, G-West.

Wholesale pharmaceutical tenders and institutional medicine tenders published in the Friday Gazette require immediate compliance checks on CEEP citizen reservation policies and bid securing declarations.

Kalahari.ai delivers a weekly procurement digest:
- Monitors the Government Gazette every Friday at 15:00 CAT.
- Isolates all PPRA Code 211 pharmaceutical and hospital tenders.
- Highlights tender document fees, closing dates, and sample submission guidelines.
- Delivers a downloadable Excel dossier every Friday before 17:00 CAT.

Explore our active tender feed:
{PORTAL_URL}/tenders

We are happy to provide Fine Pharmaceuticals with a 1-month trial of our weekly alert service. Please let me know who in your commercial team should receive the updates.

Warm regards,

{SENDER_NAME}
Kalahari.ai
Tel / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-18",
        "company": "IT-IQ Botswana",
        "to": "info@itiq.co.bw",
        "track": "Tenders",
        "subject": "Friday Tender Radar: Enterprise ICT & Systems Opportunities (PPRA Code 120)",
        "body": f"""Dear IT-IQ Botswana Commercial Team,

Writing to your team at Plot 145 in Lakeview Office Park, Gaborone.

The Government of Botswana's SmartBots initiatives and public sector digital transformation have led to a steady stream of enterprise networking, cloud, and systems support tenders published under PPRA Code 120 in the Friday Gazette. Bidding windows are short, and mandatory pre-bid meetings require immediate response.

Kalahari.ai operates an automated procurement alert service:
- Scans the Government Gazette every Friday at 15:00 CAT.
- Automatically compiles all PPRA Code 120 (ICT Systems & Technical Support) opportunities.
- Flags compulsory pre-tender site meetings, citizen reservation policies, and bid bonds.
- Delivers a clean Excel summary and WhatsApp alert every Friday before 17:00 CAT.

Inspect the live portal:
{PORTAL_URL}/tenders

We would be pleased to enroll IT-IQ Botswana in a complimentary 1-month trial. Let me know who in your business development division should receive the briefing.

Kind regards,

{SENDER_NAME}
Lead Regulatory Solutions Architect | Kalahari.ai
Mobile / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}"""
    },
    {
        "id": "tenders-19",
        "company": "Dimension Data Botswana",
        "to": "markush@didata.bw",
        "track": "Tenders",
        "subject": "Government ICT & Enterprise Infrastructure Tenders (Code 120) for Dimension Data",
        "body": f"""Dear Dimension Data Botswana Bidding Team,

Contacting your enterprise solutions team at Plot 39, Unit 2 in Gaborone International Commerce Park.

Public sector tenders for data centers, network infrastructure, cybersecurity, and managed IT services under PPRA Code 120 appear weekly in the Government Gazette. Gaining early visibility the moment the Gazette is released at 15:00 CAT on Friday gives your pre-sales architects the required lead time to structure compliant solutions.

Kalahari.ai provides weekly automated procurement intelligence:
- Extracts all PPRA Code 120 tenders from the Friday Gazette Supplement.
- Details all mandatory pre-bid conference requirements, closing times, and bid security terms.
- Delivers an executive briefing and Excel export before 17:00 CAT every Friday.

Explore the active tender radar:
{PORTAL_URL}/tenders

We are offering Dimension Data a 1-month trial of our Friday tender distribution. I would be pleased to confirm the best email and WhatsApp coordinates for your bid office.

Warm regards,

{SENDER_NAME}
Kalahari.ai
Tel / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Gaborone, Botswana"""
    },
    {
        "id": "tenders-20",
        "company": "Bytes Technology Group Botswana",
        "to": "info@btg.bw",
        "track": "Tenders",
        "subject": "Friday Tender Radar: Systems & Server Support Contracting (PPRA Code 120)",
        "body": f"""Dumelang Bytes Technology Group Management,

Writing to your team at Plot 14399 on New Lobatse Road in G-West Industrial.

Government software licensing, server support, and IT infrastructure tenders published under PPRA Code 120 require rapid evaluation of eligibility and site meeting dates.

Kalahari.ai's Friday Tender Radar delivers:
- Immediate scanning of the Government Gazette every Friday at 15:00 CAT.
- Filtered extraction of all PPRA Code 120 tenders.
- Clear flags on compulsory pre-bid conferences, bid bond amounts, and citizen ownership reservations.
- Clean Excel dossiers delivered every Friday by 17:00 CAT.

View the active tender feed:
{PORTAL_URL}/tenders

We would be delighted to add Bytes Technology Group to this Friday's alert distribution. Please let me know who in your commercial department should receive the dossier.

Sincerely,

{SENDER_NAME}
Kalahari.ai
Direct / WhatsApp: {SENDER_PHONE}
Email: {SENDER_EMAIL} (Direct) | {CORPORATE_EMAIL}
Gaborone, Botswana"""
    }
]

def preview_campaigns():
    print(f"================================================================================")
    print(f"KALAHARI.AI CLIENT OUTREACH CAMPAIGNS ({len(OUTREACH_CAMPAIGNS)} BESPOKE DRAFTS)")
    print(f"Sender: {SENDER_NAME} <{SENDER_EMAIL}> (Direct) | {CORPORATE_EMAIL} | {SENDER_PHONE}")
    print(f"Portal: {PORTAL_URL}")
    print(f"================================================================================\n")
    for idx, c in enumerate(OUTREACH_CAMPAIGNS, start=1):
        print(f"[{idx}/{len(OUTREACH_CAMPAIGNS)}] {c['track'].upper()} -> {c['company']} <{c['to']}>")
        print(f"Subject: {c['subject']}")
        print(f"--- BODY PREVIEW ---")
        print(c['body'][:220] + "...\n")

def dispatch_smtp(dry_run=True):
    if dry_run:
        print("Dry run active. No real emails dispatched. Run with --send to transmit via SMTP.")
        return

    smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", 587))
    smtp_user = os.environ.get("SMTP_USER", SENDER_EMAIL)
    smtp_pass = os.environ.get("SMTP_PASS")

    if not smtp_pass:
        print("ERROR: SMTP_PASS environment variable is not set.")
        print("To send live emails, configure: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS")
        sys.exit(1)

    print(f"Connecting to SMTP server {smtp_host}:{smtp_port} as {smtp_user}...")
    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_pass)

    success_count = 0
    for idx, c in enumerate(OUTREACH_CAMPAIGNS, start=1):
        try:
            msg = MIMEMultipart()
            msg['From'] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
            msg['To'] = c['to']
            msg['Reply-To'] = f"{CORPORATE_EMAIL}, {SENDER_EMAIL}"
            msg['Subject'] = c['subject']
            msg.attach(MIMEText(c['body'], 'plain'))

            server.send_message(msg)
            print(f"✓ [{idx}/40] Dispatched to {c['company']} <{c['to']}>")
            success_count += 1
        except Exception as e:
            print(f"✗ [{idx}/40] Failed sending to {c['company']}: {e}")

    server.quit()
    print(f"\nCompleted: {success_count}/{len(OUTREACH_CAMPAIGNS)} emails sent successfully.")

if __name__ == "__main__":
    if "--send" in sys.argv:
        dispatch_smtp(dry_run=False)
    else:
        preview_campaigns()
        dispatch_smtp(dry_run=True)
