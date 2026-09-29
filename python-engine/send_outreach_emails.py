"""
Kalahari Optics Client Outreach Dispatcher
Direct short-form B2B outreach for Botswana Customs Clearing Agents & PPRA Commercial Contractors.
Features 40 individualized, short-and-sweet email drafts.
Supports --dry-run (preview) and --send (SMTP dispatch).
"""

import sys
import os
import smtplib
import time
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ==============================================================================
# SENDER IDENTITY (Gift Jr Letso Nakedi)
# ==============================================================================
SENDER_NAME = "Gift Jr Letso Nakedi"
SENDER_EMAIL = "taylith338@gmail.com"
CORPORATE_EMAIL = "gnakedi@bloodchain.life"
SENDER_PHONE = "+267 72161038"
PORTAL_URL = "https://kalahari-optics.vercel.app"

# ==============================================================================
# 40 SHORT-FORM INDIVIDUALIZED EMAIL CAMPAIGNS
# ==============================================================================
OUTREACH_CAMPAIGNS = [
    {
        "id": "customs-01",
        "company": "Dianella Investments",
        "to": "info@dianellaclearing.com",
        "track": "Customs",
        "subject": "Kalahari Optics & Dianella Investments: Customs data extraction & pre-lodgments",
        "body": """Good day Team Dianella Investments,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-02",
        "company": "HP Global Logistics",
        "to": "info@hpglogistics.com",
        "track": "Customs",
        "subject": "Kalahari Optics & HP Global Logistics: Customs data extraction & pre-lodgments",
        "body": """Good day Team HP Global Logistics,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-03",
        "company": "Transport Holdings (Botswana)",
        "to": "sales@transportholdings.com",
        "track": "Customs",
        "subject": "Kalahari Optics & Transport Holdings (Botswana): Customs data extraction & pre-lodgments",
        "body": """Good day Team Transport Holdings (Botswana),

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-04",
        "company": "Multi Task Distributors (Pty) Ltd",
        "to": "enquiries@multitaskmoving.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & Multi Task Distributors (Pty) Ltd: Customs data extraction & pre-lodgments",
        "body": """Good day Team Multi Task Distributors (Pty) Ltd,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-05",
        "company": "Cargo Junxion",
        "to": "forwarding@junxion-bw.com",
        "track": "Customs",
        "subject": "Kalahari Optics & Cargo Junxion: Customs data extraction & pre-lodgments",
        "body": """Good day Team Cargo Junxion,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-06",
        "company": "OCA Clearing (Olorato Clearing Agent)",
        "to": "info@ocaclearing.com",
        "track": "Customs",
        "subject": "Kalahari Optics & OCA Clearing (Olorato Clearing Agent): Customs data extraction & pre-lodgments",
        "body": """Good day Team OCA Clearing (Olorato Clearing Agent),

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-07",
        "company": "Gateway Freight Forwarding & Clearing",
        "to": "info@gatewayfreight.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & Gateway Freight Forwarding & Clearing: Customs data extraction & pre-lodgments",
        "body": """Good day Team Gateway Freight Forwarding & Clearing,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-08",
        "company": "Zebra Shipping (Pty) Ltd",
        "to": "admin@zebrashipping.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & Zebra Shipping (Pty) Ltd: Customs data extraction & pre-lodgments",
        "body": """Good day Team Zebra Shipping (Pty) Ltd,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-09",
        "company": "Manica Botswana (Pty) Ltd",
        "to": "manica@info.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & Manica Botswana (Pty) Ltd: Customs data extraction & pre-lodgments",
        "body": """Good day Team Manica Botswana (Pty) Ltd,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-10",
        "company": "DSV Botswana",
        "to": "botswanadsv@bw.dsv.com",
        "track": "Customs",
        "subject": "Kalahari Optics & DSV Botswana: Customs data extraction & pre-lodgments",
        "body": """Good day Team DSV Botswana,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-11",
        "company": "DHL Global Forwarding Botswana",
        "to": "enquiries@dhl.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & DHL Global Forwarding Botswana: Customs data extraction & pre-lodgments",
        "body": """Good day Team DHL Global Forwarding Botswana,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-12",
        "company": "AGS Frasers Botswana",
        "to": "sales@agsfrasers.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & AGS Frasers Botswana: Customs data extraction & pre-lodgments",
        "body": """Good day Team AGS Frasers Botswana,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-13",
        "company": "Sky Bridge Logistics",
        "to": "info@skybridge.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & Sky Bridge Logistics: Customs data extraction & pre-lodgments",
        "body": """Good day Team Sky Bridge Logistics,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-14",
        "company": "Advance Freight Services (Pty) Ltd",
        "to": "gsburt@it.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & Advance Freight Services (Pty) Ltd: Customs data extraction & pre-lodgments",
        "body": """Good day Team Advance Freight Services (Pty) Ltd,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-15",
        "company": "BMR Freight Services",
        "to": "bmrfreight@bbi.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & BMR Freight Services: Customs data extraction & pre-lodgments",
        "body": """Good day Team BMR Freight Services,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-16",
        "company": "Estamok Freight (Pty) Ltd",
        "to": "estamok@gmail.com",
        "track": "Customs",
        "subject": "Kalahari Optics & Estamok Freight (Pty) Ltd: Customs data extraction & pre-lodgments",
        "body": """Good day Team Estamok Freight (Pty) Ltd,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-17",
        "company": "ACS Global Forwarding",
        "to": "vijayrp@acsglobal.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & ACS Global Forwarding: Customs data extraction & pre-lodgments",
        "body": """Good day Team ACS Global Forwarding,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-18",
        "company": "Elliott Forwarding (Pty) Ltd",
        "to": "gaborone@elliott.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & Elliott Forwarding (Pty) Ltd: Customs data extraction & pre-lodgments",
        "body": """Good day Team Elliott Forwarding (Pty) Ltd,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-19",
        "company": "Clakho Import & Export (Pty) Ltd",
        "to": "clakho@mega.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & Clakho Import & Export (Pty) Ltd: Customs data extraction & pre-lodgments",
        "body": """Good day Team Clakho Import & Export (Pty) Ltd,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "customs-20",
        "company": "Kya Sands Transport Ltd",
        "to": "khayasands@ftnet.co.bw",
        "track": "Customs",
        "subject": "Kalahari Optics & Kya Sands Transport Ltd: Customs data extraction & pre-lodgments",
        "body": """Good day Team Kya Sands Transport Ltd,

We're Kalahari Optics, here to assist with BURS SAD 500 pre-lodgments and automated commercial invoice data extraction. We can see that you regularly work with customs clearance and road freight documentation, and probably have to contend with time-consuming manual invoice entry and strict BURS pre-lodgment deadlines.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/customs or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-01",
        "company": "Stefanutti Stocks (Botswana) (Pty) Ltd",
        "to": "receptionbotswana@stefstocks.com",
        "track": "Tenders",
        "subject": "Kalahari Optics & Stefanutti Stocks (Botswana) (Pty) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Stefanutti Stocks (Botswana) (Pty) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-02",
        "company": "Estate Construction (Pty) Ltd",
        "to": "reception@estateconstruction.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Estate Construction (Pty) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Estate Construction (Pty) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-03",
        "company": "Bothakga Burrow Botswana (Pty) Ltd",
        "to": "bbbl@bbbl.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Bothakga Burrow Botswana (Pty) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Bothakga Burrow Botswana (Pty) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-04",
        "company": "Unik Construction Engineering",
        "to": "unik@unikconst.com",
        "track": "Tenders",
        "subject": "Kalahari Optics & Unik Construction Engineering: Friday Government Gazette tender radar",
        "body": """Good day Team Unik Construction Engineering,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-05",
        "company": "Asphalt Botswana (Pty) Ltd",
        "to": "info@asphaltbotswana.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Asphalt Botswana (Pty) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Asphalt Botswana (Pty) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-06",
        "company": "Sharps Electrical (Pty) Ltd",
        "to": "pshailendra@sharps.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Sharps Electrical (Pty) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Sharps Electrical (Pty) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-07",
        "company": "Bokone Reticulation & Electrical Systems (BRES)",
        "to": "bres@btcmail.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Bokone Reticulation & Electrical Systems (BRES): Friday Government Gazette tender radar",
        "body": """Good day Team Bokone Reticulation & Electrical Systems (BRES),

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-08",
        "company": "Chandie Electrical Engineers",
        "to": "info@chanelecteng.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Chandie Electrical Engineers: Friday Government Gazette tender radar",
        "body": """Good day Team Chandie Electrical Engineers,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-09",
        "company": "Mod Controls (Botswana)",
        "to": "modiri@modcontrols.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Mod Controls (Botswana): Friday Government Gazette tender radar",
        "body": """Good day Team Mod Controls (Botswana),

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-10",
        "company": "Wellfield Consulting Services",
        "to": "info@wellfield.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Wellfield Consulting Services: Friday Government Gazette tender radar",
        "body": """Good day Team Wellfield Consulting Services,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-11",
        "company": "Water Surveys (Botswana) (Pty) Ltd",
        "to": "wsb@it.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Water Surveys (Botswana) (Pty) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Water Surveys (Botswana) (Pty) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-12",
        "company": "Geoflux (Pty) Ltd",
        "to": "info@geoflux.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Geoflux (Pty) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Geoflux (Pty) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-13",
        "company": "Groundwater Technology (Botswana) Ltd",
        "to": "info@groundwater.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Groundwater Technology (Botswana) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Groundwater Technology (Botswana) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-14",
        "company": "Kalahari Medical Distributors (KMD)",
        "to": "info@kmd.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Kalahari Medical Distributors (KMD): Friday Government Gazette tender radar",
        "body": """Good day Team Kalahari Medical Distributors (KMD),

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-15",
        "company": "Pharma Vision (Pty) Ltd",
        "to": "info@pharmavision.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Pharma Vision (Pty) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Pharma Vision (Pty) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-16",
        "company": "Mediland Healthcare Distributors",
        "to": "info@mediland.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Mediland Healthcare Distributors: Friday Government Gazette tender radar",
        "body": """Good day Team Mediland Healthcare Distributors,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-17",
        "company": "Fine Pharmaceuticals (Pty) Ltd",
        "to": "admin@finepharma.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Fine Pharmaceuticals (Pty) Ltd: Friday Government Gazette tender radar",
        "body": """Good day Team Fine Pharmaceuticals (Pty) Ltd,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-18",
        "company": "IT-IQ Botswana",
        "to": "info@itiq.co.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & IT-IQ Botswana: Friday Government Gazette tender radar",
        "body": """Good day Team IT-IQ Botswana,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-19",
        "company": "Dimension Data Botswana",
        "to": "markush@didata.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Dimension Data Botswana: Friday Government Gazette tender radar",
        "body": """Good day Team Dimension Data Botswana,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },
    {
        "id": "tenders-20",
        "company": "Bytes Technology Group Botswana",
        "to": "info@btg.bw",
        "track": "Tenders",
        "subject": "Kalahari Optics & Bytes Technology Group Botswana: Friday Government Gazette tender radar",
        "body": """Good day Team Bytes Technology Group Botswana,

We're Kalahari Optics, here to assist with automated Friday Government Gazette tender extraction and PPRA opportunity filtering. We can see that you regularly work with government tenders and commercial bidding, and probably have to contend with sifting through lengthy weekly gazettes and tracking tight site inspection schedules.

Would you like to have a quick chat and explore our data extraction engine to see if it can help save you money and time?

You can learn about our services at https://kalahari-optics.vercel.app/tenders or text Kalahari to +267 72161038 on WhatsApp.

Best regards,

Gift Jr Letso Nakedi
Kalahari Optics
Direct / WhatsApp: +267 72161038
Email: taylith338@gmail.com | gnakedi@bloodchain.life
Gaborone, Botswana"""
    },

]

def preview_campaigns():
    print("=" * 80)
    print(f"KALAHARI OPTICS CLIENT OUTREACH CAMPAIGNS ({len(OUTREACH_CAMPAIGNS)} BESPOKE SHORT DRAFTS)")
    print(f"Sender: {SENDER_NAME} <{SENDER_EMAIL}> | {CORPORATE_EMAIL} | {SENDER_PHONE}")
    print(f"Portal: {PORTAL_URL}")
    print("=" * 80 + "\n")
    for idx, c in enumerate(OUTREACH_CAMPAIGNS, start=1):
        print(f"[{idx}/{len(OUTREACH_CAMPAIGNS)}] {c['track'].upper()} -> {c['company']} <{c['to']}>")
        print(f"Subject: {c['subject']}")
        print(f"--- BODY PREVIEW ---")
        print(c['body'][:200] + "...\n")

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

    smtp_pass = smtp_pass.replace(" ", "").strip()

    print(f"Connecting to SMTP server {smtp_host}:{smtp_port} as {smtp_user}...")
    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_pass)

    state_file = os.path.join(os.path.dirname(__file__), "sent_campaigns.json")
    sent_ids = set()
    if os.path.exists(state_file):
        try:
            with open(state_file, "r", encoding="utf-8") as f:
                sent_ids = set(json.load(f))
        except Exception:
            sent_ids = set()

    print(f"Loaded sent tracking: {len(sent_ids)} campaigns already marked in log.")

    success_count = 0
    for idx, c in enumerate(OUTREACH_CAMPAIGNS, start=1):
        if c['id'] in sent_ids:
            print(f"[SKIP] [{idx}/40] Already sent to {c['company']} ({c['id']})")
            continue

        try:
            msg = MIMEMultipart()
            msg['From'] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
            msg['To'] = c['to']
            msg['Reply-To'] = f"{CORPORATE_EMAIL}, {SENDER_EMAIL}"
            msg['Subject'] = c['subject']
            msg.attach(MIMEText(c['body'], 'plain'))

            server.send_message(msg)
            print(f"[SENT] [{idx}/40] Dispatched to {c['company']} <{c['to']}>")
            sent_ids.add(c['id'])
            with open(state_file, "w", encoding="utf-8") as f:
                json.dump(list(sent_ids), f, indent=2)
            success_count += 1
            time.sleep(1.5)  # respectful pacing for SMTP delivery
        except Exception as e:
            print(f"[FAILED] [{idx}/40] Failed sending to {c['company']}: {e}")

    server.quit()
    print(f"\nCompleted: {success_count} emails sent in this session.")

if __name__ == "__main__":
    if "--send" in sys.argv:
        dispatch_smtp(dry_run=False)
    else:
        preview_campaigns()
        dispatch_smtp(dry_run=True)
