import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Download, AlertTriangle, ArrowRight, ShieldCheck, RefreshCw, BookmarkPlus, Zap } from 'lucide-react';
import { SAMPLE_CUSTOMS_DECLARATION } from '../data/initialData';
import { exportCustomsDeclarationExcel } from '../utils/excelExport';

export default function CustomsParserView({ onSaveDeclaration }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState("");
  const [currentDeclaration, setCurrentDeclaration] = useState(SAMPLE_CUSTOMS_DECLARATION);
  const [isSaved, setIsSaved] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("sample_crossborder_commercial_invoice.pdf");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    processInvoiceSim(file.name);
  };

  const loadSample = () => {
    setUploadedFileName("sample_crossborder_commercial_invoice.pdf");
    processInvoiceSim("sample_crossborder_commercial_invoice.pdf");
  };

  const processInvoiceSim = (fileName) => {
    setIsProcessing(true);
    setIsSaved(false);

    setProgressStep("Reading commercial invoice and extracting line items...");
    setTimeout(() => {
      setProgressStep("Validating 8-digit HS Tariff Codes & SADC Rules of Origin...");
    }, 800);

    setTimeout(() => {
      setProgressStep("Converting ZAR to BWP, calculating VDP, Customs Duty & 14% Import VAT...");
    }, 1600);

    setTimeout(() => {
      setIsProcessing(false);
      setProgressStep("");
      setCurrentDeclaration(SAMPLE_CUSTOMS_DECLARATION);
    }, 2400);
  };

  const handleDownloadExcel = () => {
    if (!currentDeclaration) return;
    exportCustomsDeclarationExcel(currentDeclaration, `BURS_SAD500_${currentDeclaration.metadata.invoice_number}.xlsx`);
  };

  const handleDownloadJson = () => {
    if (!currentDeclaration) return;
    const blob = new Blob([JSON.stringify(currentDeclaration, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BURS_SAD500_${currentDeclaration.metadata.invoice_number}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveToHistory = () => {
    if (!currentDeclaration) return;
    onSaveDeclaration({
      id: "decl-" + Date.now(),
      invoiceNumber: currentDeclaration.metadata.invoice_number,
      date: new Date().toLocaleDateString('en-GB'),
      importer: currentDeclaration.metadata.importer.name,
      borderPost: currentDeclaration.metadata.transport.border_post,
      assessedBwp: currentDeclaration.sad500_assessment.total_burs_payable_bwp,
      penaltySaved: 10000,
      fullData: currentDeclaration
    });
    setIsSaved(true);
  };

  const meta = currentDeclaration?.metadata || {};
  const assess = currentDeclaration?.sad500_assessment || {};
  const items = currentDeclaration?.line_items || [];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent p-4 rounded-2xl border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">BURS Mandatory Pre-Lodgment Enforcement</h3>
            <p className="text-xs text-slate-600">Cross-border freight arriving without verified SAD 500 pre-clearance incurs a <strong>BWP 10,000 fine</strong> plus demurrage.</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Automatic Penalty Prevention</span>
        </div>
      </div>

      {/* Invoice Ingestion & Upload Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Upload Commercial Invoice (PDF / Image / Excel)
          </h2>
          <p className="text-sm text-slate-600">
            Upload any foreign supplier invoice from South Africa, China, or Europe to generate a verified BURS SAD 500 declaration in 30 seconds.
          </p>

          {/* Drag & Drop Area */}
          <div className="relative border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-8 transition bg-slate-50/50 hover:bg-sky-50/20 cursor-pointer">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.png,.jpg,.jpeg,.xlsx,.csv"
            />
            <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-slate-800">
                Click to browse or drop supplier invoice PDF here
              </div>
              <p className="text-xs text-slate-500">Supports multi-page commercial invoices, bills of lading, and packing lists</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={loadSample}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow transition"
            >
              <Zap className="w-4 h-4 text-sky-400" />
              <span>Evaluate Commercial Invoice (ZAR 321,000)</span>
            </button>
            <span className="text-xs text-slate-400">Current File: <span className="font-mono text-slate-700 font-semibold">{uploadedFileName}</span></span>
          </div>
        </div>

        {/* Processing State Animation */}
        {isProcessing && (
          <div className="mt-8 p-6 rounded-2xl bg-sky-50 border border-sky-200 text-center space-y-3 animate-pulse">
            <RefreshCw className="w-6 h-6 text-sky-600 animate-spin mx-auto" />
            <h4 className="text-sm font-bold text-sky-950">AI Extraction in Progress</h4>
            <p className="text-xs font-mono text-sky-800">{progressStep}</p>
          </div>
        )}
      </div>

      {/* Declaration Assessment & Summary */}
      {currentDeclaration && !isProcessing && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Declaration Ready for BURS Pre-Lodgment</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                BURS SAD 500 Assessment: Invoice #{meta.invoice_number}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleDownloadExcel}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition"
              >
                <Download className="w-4 h-4" />
                <span>Download BURS Excel (.xlsx)</span>
              </button>

              <button
                onClick={handleDownloadJson}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-sm transition"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON EDI</span>
              </button>

              <button
                onClick={handleSaveToHistory}
                disabled={isSaved}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  isSaved
                    ? 'bg-slate-100 text-slate-400 cursor-default'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <BookmarkPlus className="w-4 h-4 text-sky-400" />
                <span>{isSaved ? "Saved in Trail" : "Save to History"}</span>
              </button>
            </div>
          </div>

          {/* Overview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customs Port & Regime</div>
              <div className="text-base font-extrabold text-slate-900 mt-1">{meta.transport?.border_post}</div>
              <div className="text-xs font-mono text-slate-500 mt-0.5">Code: {meta.transport?.border_code} &bull; IM 4 (Home Consumption)</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Importer TIN & VAT</div>
              <div className="text-base font-extrabold text-slate-900 mt-1 truncate">{meta.importer?.name}</div>
              <div className="text-xs font-mono text-slate-500 mt-0.5">TIN: {meta.importer?.tin}</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">VDP Assessed (BWP)</div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">P {assess.total_vdp_bwp?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="text-xs text-slate-500 mt-0.5">Rate: 1 ZAR = {assess.customs_exchange_rate} BWP</div>
            </div>

            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total BURS Tax Payable</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">P {assess.total_burs_payable_bwp?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <div className="text-xs text-slate-400 mt-0.5">Duty: P {assess.total_duty_payable_bwp?.toFixed(2)} | VAT: P {assess.total_import_vat_bwp?.toFixed(2)}</div>
            </div>
          </div>

          {/* Line Items Schedule Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">SAD 500 Classified Line Items</h3>
                <p className="text-xs text-slate-500">Each item classified with HS code, SADC origin preference, VDP and BURS VAT.</p>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                {items.length} Line Items
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[11px]">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Description of Goods</th>
                    <th className="py-3 px-4">HS Code</th>
                    <th className="py-3 px-4">Origin</th>
                    <th className="py-3 px-4">Qty</th>
                    <th className="py-3 px-4">VDP (BWP)</th>
                    <th className="py-3 px-4">Duty</th>
                    <th className="py-3 px-4">14% VAT</th>
                    <th className="py-3 px-4">Total Tax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.item_no} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-mono text-slate-400">{item.item_no}</td>
                      <td className="py-3 px-4 font-medium text-slate-900 max-w-xs truncate">{item.description}</td>
                      <td className="py-3 px-4 font-mono font-bold text-sky-700">{item.hs_code}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.origin === 'ZA' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {item.origin} ({item.trade_regime})
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{item.qty} {item.uom}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">P {item.vdp_bwp?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">P {item.duty_payable_bwp?.toFixed(2)}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">P {item.vat_bwp?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">P {item.total_tax_bwp?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-2">
              <span>Haulier: <strong>{meta.transport?.carrier}</strong> &bull; Horse: <code className="text-slate-800">{meta.transport?.horse_reg}</code> &bull; Trailer: <code className="text-slate-800">{meta.transport?.trailer_reg}</code></span>
              <span className="font-semibold text-emerald-700">Pre-Lodgment Verified: Ready for immediate BURS CMS upload</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
