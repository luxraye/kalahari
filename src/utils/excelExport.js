import * as XLSX from 'xlsx';

export function exportCustomsDeclarationExcel(declaration, filename = "BURS_SAD500_Declaration.xlsx") {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Header & Valuation Summary
  const meta = declaration.metadata || {};
  const assess = declaration.sad500_assessment || {};
  const imp = meta.importer || {};
  const exp = meta.exporter || {};
  const trn = meta.transport || {};

  const headerData = [
    { "BURS Field": "Customs Regime", "Value": "IM 4 (Direct Import for Home Consumption)" },
    { "BURS Field": "Customs Office / Port of Entry", "Value": `${trn.border_post || "Tlokweng"} (${trn.border_code || "BWTLK"})` },
    { "BURS Field": "Commercial Invoice No.", "Value": meta.invoice_number || "INV-001" },
    { "BURS Field": "Invoice Date", "Value": meta.invoice_date || "" },
    { "BURS Field": "Incoterms 2020", "Value": meta.incoterms || "CIP Gaborone" },
    { "BURS Field": "Importer / Consignee", "Value": imp.name || "Botswana Importer" },
    { "BURS Field": "Importer BURS TIN", "Value": imp.tin || "" },
    { "BURS Field": "Importer VAT Number", "Value": imp.vat_number || "" },
    { "BURS Field": "Exporter / Consignor", "Value": `${exp.name || ""} (${exp.country_code || "ZA"})` },
    { "BURS Field": "Haulier / Carrier", "Value": trn.carrier || "" },
    { "BURS Field": "Truck / Trailer Reg", "Value": `${trn.horse_reg || ""} / ${trn.trailer_reg || ""}` },
    { "BURS Field": "Consignment Note / Waybill", "Value": trn.waybill_number || "" },
    { "BURS Field": "Customs Exchange Rate (ZAR/BWP)", "Value": assess.customs_exchange_rate || 0.742 },
    { "BURS Field": "Total Invoice Amount (ZAR)", "Value": assess.total_invoice_zar || 0 },
    { "BURS Field": "Value for Duty Purposes (VDP BWP)", "Value": assess.total_vdp_bwp || 0 },
    { "BURS Field": "Total Customs Duty Payable (BWP)", "Value": assess.total_duty_payable_bwp || 0 },
    { "BURS Field": "Total Import VAT Payable (14% BWP)", "Value": assess.total_import_vat_bwp || 0 },
    { "BURS Field": "TOTAL BURS TAX ASSESSED (BWP)", "Value": assess.total_burs_payable_bwp || 0 },
    { "BURS Field": "Compliance Clearance Status", "Value": "PRE-LODGED & VERIFIED (Penalty BWP 10,000 Waived)" }
  ];

  const wsHeader = XLSX.utils.json_to_sheet(headerData);
  XLSX.utils.book_append_sheet(wb, wsHeader, "SAD 500 Header");

  // Sheet 2: Line Items
  const items = (declaration.line_items || []).map(item => ({
    "Item #": item.item_no,
    "Description of Goods": item.description,
    "HS Tariff Code": item.hs_code,
    "Country of Origin": item.origin,
    "Trade Regime": item.trade_regime,
    "Quantity": item.qty,
    "Unit": item.uom,
    "Net Wt (Kg)": item.net_weight_kg,
    "Invoice Val (ZAR)": item.invoice_zar,
    "Customs Value / VDP (BWP)": item.vdp_bwp,
    "Duty Rate": item.duty_rate,
    "Duty Payable (BWP)": item.duty_payable_bwp,
    "Import VAT (14% BWP)": item.vat_bwp,
    "Total Tax Payable (BWP)": item.total_tax_bwp
  }));

  const wsItems = XLSX.utils.json_to_sheet(items);
  XLSX.utils.book_append_sheet(wb, wsItems, "SAD 500 Line Items");

  // Write file to user's browser
  XLSX.writeFile(wb, filename);
}

export function exportTendersExcel(tenders, filename = "Botswana_Government_Tenders.xlsx") {
  const wb = XLSX.utils.book_new();

  const data = tenders.map(t => ({
    "Tender Number": t.tender_number,
    "Procuring Entity": t.procuring_entity,
    "Industry Category": t.industry_category,
    "PPRA Code": t.ppra_code,
    "PPRA Registration Details": t.ppra_details,
    "Tender Title": t.tender_title,
    "Citizen Reservation": t.citizen_reservation,
    "Compulsory Site Meeting": t.site_meeting?.held ? (t.site_meeting?.compulsory ? "YES (Compulsory)" : "Optional") : "None",
    "Site Meeting Details": t.site_meeting?.held ? `${t.site_meeting?.date_time} at ${t.site_meeting?.location}` : "N/A",
    "Closing Date": t.closing_display,
    "Tender Fee": t.tender_fee_bwp,
    "Bid Bond / Security": t.bid_security_bwp,
    "Submission Venue": t.submission_venue
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Active Tenders");
  XLSX.writeFile(wb, filename);
}
