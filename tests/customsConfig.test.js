import { test } from 'node:test';
import assert from 'node:assert/strict';
import { 
  DEFAULT_BURS_EXCHANGE_RATE,
  DEFAULT_BOTSWANA_VAT_RATE,
  DEFAULT_MFN_DUTY_RATE,
  calculateVdp,
  calculateDuty,
  calculateImportVat,
  computeSad500Totals
} from '../src/config/customsConfig.js';

test('calculateVdp correctly converts ZAR invoice to BWP VDP', () => {
  const zarAmount = 321000;
  const rate = 0.7420;
  const vdp = calculateVdp(zarAmount, rate);
  assert.equal(vdp, 238182.00);
});

test('calculateDuty gives 0% for SADC origin and 5% for MFN origin', () => {
  const vdp = 10000;
  
  // SADC origin
  const sadcDuty = calculateDuty(vdp, 'ZA', 'SADC Protocol');
  assert.equal(sadcDuty, 0);

  // MFN / Foreign origin (e.g. Germany)
  const mfnDuty = calculateDuty(vdp, 'DE', 'General / MFN');
  assert.equal(mfnDuty, 500); // 5% of 10,000 = 500
});

test('calculateImportVat calculates 14% on (VDP + Duty)', () => {
  const vdp = 20000;
  const duty = 1000;
  // (20000 + 1000) * 0.14 = 2940
  const vat = calculateImportVat(vdp, duty, 0.14);
  assert.equal(vat, 2940);
});

test('computeSad500Totals accurately aggregates multi-item consignment', () => {
  const items = [
    {
      item_no: 1,
      description: "Hydraulic Cylinder",
      origin: "ZA",
      trade_regime: "SADC Protocol",
      invoice_zar: 100000
    },
    {
      item_no: 2,
      description: "Tapered Bearings",
      origin: "DE",
      trade_regime: "General / MFN",
      invoice_zar: 20000
    }
  ];

  const result = computeSad500Totals(items, { exchangeRate: 0.7420, vatRate: 0.14, mfnRate: 0.05 });
  const { assessment, line_items } = result;

  assert.equal(assessment.customs_exchange_rate, 0.7420);
  assert.equal(assessment.total_invoice_zar, 120000);
  assert.equal(assessment.total_vdp_bwp, 89040.00); // 120000 * 0.742
  assert.equal(line_items.length, 2);
  
  // Item 1 (ZA SADC): 0 duty
  assert.equal(line_items[0].duty_payable_bwp, 0);
  
  // Item 2 (DE MFN): VDP = 14840, duty 5% = 742
  assert.equal(line_items[1].duty_payable_bwp, 742);
  assert.equal(assessment.total_duty_payable_bwp, 742);
});
