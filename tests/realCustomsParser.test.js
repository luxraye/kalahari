import { test } from 'node:test';
import assert from 'node:assert/strict';
import { 
  classifyDescriptionToHsCode,
  extractAndCalculateDeclaration 
} from '../src/utils/realCustomsParser.js';

test('classifyDescriptionToHsCode maps mining excavator cylinder to 8412.21.00', () => {
  const result = classifyDescriptionToHsCode("Heavy Duty Hydraulic Cylinder for Mining Excavator");
  assert.equal(result.hs_code, "8412.21.00");
  assert.equal(result.origin, "ZA");
});

test('classifyDescriptionToHsCode maps roller bearings to 8482.20.00', () => {
  const result = classifyDescriptionToHsCode("Deep Groove Roller Bearing Timken 32218");
  assert.equal(result.hs_code, "8482.20.00");
  assert.equal(result.origin, "DE");
});

test('classifyDescriptionToHsCode maps conveyor belt to 4010.12.00', () => {
  const result = classifyDescriptionToHsCode("Polyurethane Conveyor Belt Roll 50m");
  assert.equal(result.hs_code, "4010.12.00");
});

test('extractAndCalculateDeclaration generates valid BURS SAD 500 structure', () => {
  const declaration = extractAndCalculateDeclaration("", "sample_invoice.pdf", 0.7420);
  
  assert.ok(declaration.metadata.invoice_number);
  assert.ok(declaration.sad500_assessment);
  assert.equal(declaration.sad500_assessment.status, "PRE-LODGED VALIDATED");
  assert.ok(declaration.line_items.length > 0);
  assert.ok(declaration.sad500_assessment.total_vdp_bwp > 0);
  assert.ok(declaration.sad500_assessment.total_burs_payable_bwp > 0);
});
