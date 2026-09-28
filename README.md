# Kalahari.ai &bull; Autonomous Regulatory & Customs Intelligence

> **Botswana Document Extraction, BURS SAD 500 Customs Clearance Pre-Lodgment & Friday Government Gazette Tender Radar.**

Built and engineered in Gaborone, Botswana by **Gift Jr Letso Nakedi** (`gnakedi@bloodchain.life` &bull; `+267 72161038`).

---

## 🚀 Key Features

1. **BURS SAD 500 Customs Clearance Pre-Lodgment Engine**:
   - Ingests foreign cross-border commercial invoices (South Africa, Asia, SADC).
   - Extracts 8-digit HS tariff classifications and SADC rules of origin.
   - Computes Value for Duty Purposes (VDP), Customs Duty, and 14% Import VAT.
   - Eliminates the **BWP 10,000 BURS pre-lodgment failure fine** at Tlokweng, Pioneer Gate, Martins Drift, and Kazungula.
   - Live download of structured BURS declarations in `.xlsx` (Excel) and `.json` (ASYCUDA/CMS EDI format).

2. **Botswana Friday Tender Radar**:
   - Live weekly Friday 15:00 CAT ingestion of the Republic of Botswana Government Gazette Extraordinary Tender Supplement.
   - Filter by PPRA code: **Code 03** (Civil/Roads), **Code 120** (ICT & Systems), **Code 10** (Boreholes/Water), **Code 01/02** (Electrical), **Code 211** (Medical).
   - Automatic warnings for compulsory site meetings, citizen reservation policies, and bid security bonds.

3. **Firebase Cloud Architecture**:
   - **Authentication**: Email/Password login, Company registration, and demo evaluation accounts.
   - **Cloud Firestore**:
     - `users/{uid}`: Client profiles and BURS TIN.
     - `customs_history`: Audited declaration history and penalty avoidance records.
     - `tenders`: Friday tender database.
     - `support_tickets`: Direct inquiries synced in real-time to the Admin Support Desk.
   - **Master Administrator**: Auto-granted to `gnakedi@bloodchain.life`.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, React Router v7, SheetJS (`xlsx`)
- **Backend & Auth**: Firebase Auth, Cloud Firestore, Firebase Analytics (`kalahari-77856`)
- **Hosting**: Vercel (SPA routing configured via `vercel.json`)

---

## ⚡ Deployment to Vercel

1. Import this repository in [Vercel](https://vercel.com/new).
2. Framework Preset: **Vite**
3. Root Directory: `./` (or `kalahari-portal` if importing parent repo)
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**!
