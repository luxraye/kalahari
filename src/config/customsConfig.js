/**
 * Botswana Unified Revenue Service (BURS) & Customs Regulatory Configuration
 * 
 * All duty constants, exchange rates, and statutory parameters are consolidated here
 * and can be dynamically configured via environment variables or runtime adjustments.
 */

// BURS Customs Exchange Rate (1 ZAR to BWP)
export const DEFAULT_BURS_EXCHANGE_RATE = 
  typeof process !== 'undefined' && process.env?.VITE_BURS_EXCHANGE_RATE
    ? parseFloat(process.env.VITE_BURS_EXCHANGE_RATE)
    : (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BURS_EXCHANGE_RATE
        ? parseFloat(import.meta.env.VITE_BURS_EXCHANGE_RATE)
        : 0.7420);

// Botswana Value Added Tax (VAT) statutory rate (14%)
export const DEFAULT_BOTSWANA_VAT_RATE = 
  typeof process !== 'undefined' && process.env?.VITE_BOTSWANA_VAT_RATE
    ? parseFloat(process.env.VITE_BOTSWANA_VAT_RATE)
    : (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BOTSWANA_VAT_RATE
        ? parseFloat(import.meta.env.VITE_BOTSWANA_VAT_RATE)
        : 0.14);

// General / Most Favoured Nation (MFN) Baseline Customs Duty Rate
export const DEFAULT_MFN_DUTY_RATE = 0.05; // 5%

// SADC Trade Protocol Preferential Tariff Rate
export const SADC_PREFERENTIAL_DUTY_RATE = 0.00; // 0%

// BURS Statutory Non-Lodgment Fine per truck entry
export const BURS_STATUTORY_FINE_BWP = 10000;

// Estimated Border Post Demurrage / Parking fee per overnight detention (Tlokweng / Pioneer Gate)
export const ESTIMATED_DEMURRAGE_PER_NIGHT_BWP = 3500;

/**
 * Calculates Value for Duty Purposes (VDP) in Botswana Pula (BWP)
 * VDP = (FOB / Invoice Value + Freight + Insurance) * Customs Exchange Rate
 */
export function calculateVdp(invoiceAmount, exchangeRate = DEFAULT_BURS_EXCHANGE_RATE) {
  const amount = Number(invoiceAmount) || 0;
  const rate = Number(exchangeRate) || DEFAULT_BURS_EXCHANGE_RATE;
  return Math.round(amount * rate * 100) / 100;
}

/**
 * Calculates Customs Duty based on Trade Regime and Origin
 * SADC Protocol goods originating in SADC member states qualify for 0% duty.
 * Non-originating or MFN items incur the applicable tariff rate.
 */
export function calculateDuty(vdpBwp, origin = 'ZA', tradeRegime = 'SADC Protocol', customRate = null) {
  const vdp = Number(vdpBwp) || 0;
  if (customRate !== null && !isNaN(customRate)) {
    return Math.round(vdp * Number(customRate) * 100) / 100;
  }
  
  const isSadc = (origin === 'ZA' || origin === 'SADC' || tradeRegime?.includes('SADC'));
  const rate = isSadc ? SADC_PREFERENTIAL_DUTY_RATE : DEFAULT_MFN_DUTY_RATE;
  return Math.round(vdp * rate * 100) / 100;
}

/**
 * Calculates BURS Import VAT (14%)
 * Statutory Formula: 14% applied to (VDP + Customs Duty Payable)
 */
export function calculateImportVat(vdpBwp, dutyBwp = 0, vatRate = DEFAULT_BOTSWANA_VAT_RATE) {
  const taxableBasis = (Number(vdpBwp) || 0) + (Number(dutyBwp) || 0);
  const rate = Number(vatRate) || DEFAULT_BOTSWANA_VAT_RATE;
  return Math.round(taxableBasis * rate * 100) / 100;
}

/**
 * Full SAD 500 Assessment Schedule Calculator
 */
export function computeSad500Totals(lineItems = [], options = {}) {
  const exchangeRate = Number(options.exchangeRate) || DEFAULT_BURS_EXCHANGE_RATE;
  const vatRate = Number(options.vatRate) || DEFAULT_BOTSWANA_VAT_RATE;
  const mfnRate = Number(options.mfnRate) || DEFAULT_MFN_DUTY_RATE;

  let totalInvoiceZar = 0;
  let totalVdpBwp = 0;
  let totalDutyBwp = 0;
  let totalVatBwp = 0;

  const processedItems = lineItems.map((item, idx) => {
    const itemZar = Number(item.invoice_zar || item.total_amount || (item.qty * item.unit_price) || 0);
    const itemVdp = calculateVdp(itemZar, exchangeRate);
    
    // Determine duty rate
    let dutyRate = item.duty_rate;
    let dutyAmount = 0;
    const isSadc = item.origin === 'ZA' || item.country_of_origin === 'ZA' || item.trade_regime?.includes('SADC');
    
    if (isSadc) {
      dutyRate = "0%";
      dutyAmount = 0;
    } else {
      dutyRate = `${Math.round(mfnRate * 100)}%`;
      dutyAmount = calculateDuty(itemVdp, item.origin || item.country_of_origin, item.trade_regime, mfnRate);
    }

    const itemVat = calculateImportVat(itemVdp, dutyAmount, vatRate);
    const totalTax = Math.round((dutyAmount + itemVat) * 100) / 100;

    totalInvoiceZar += itemZar;
    totalVdpBwp += itemVdp;
    totalDutyBwp += dutyAmount;
    totalVatBwp += itemVat;

    return {
      item_no: item.item_no || (idx + 1),
      description: item.description || "Commercial Merchandise",
      hs_code: item.hs_code || "8412.21.00",
      origin: item.origin || item.country_of_origin || "ZA",
      trade_regime: isSadc ? "SADC Protocol" : "General / MFN",
      qty: Number(item.qty || item.quantity || 1),
      uom: item.uom || "PCS",
      net_weight_kg: Number(item.net_weight_kg || 0),
      invoice_zar: Math.round(itemZar * 100) / 100,
      vdp_bwp: itemVdp,
      duty_rate: dutyRate,
      duty_payable_bwp: dutyAmount,
      vat_bwp: itemVat,
      total_tax_bwp: totalTax
    };
  });

  const totalBursPayable = Math.round((totalDutyBwp + totalVatBwp) * 100) / 100;

  return {
    assessment: {
      customs_exchange_rate: exchangeRate,
      vat_rate: vatRate,
      total_invoice_zar: Math.round(totalInvoiceZar * 100) / 100,
      total_vdp_bwp: Math.round(totalVdpBwp * 100) / 100,
      total_duty_payable_bwp: Math.round(totalDutyBwp * 100) / 100,
      total_import_vat_bwp: Math.round(totalVatBwp * 100) / 100,
      total_burs_payable_bwp: totalBursPayable,
      status: "PRE-LODGED VALIDATED"
    },
    line_items: processedItems
  };
}
