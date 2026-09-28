/**
 * Vercel Serverless Function: /api/parse-customs
 * 
 * Provides an HTTP endpoint for BURS SAD 500 invoice parsing.
 * Accepts multipart/form-data or JSON payloads and returns structured declarations.
 */

import { extractAndCalculateDeclaration } from '../src/utils/realCustomsParser.js';
import { DEFAULT_BURS_EXCHANGE_RATE } from '../src/config/customsConfig.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: "operational",
      engine: "BURS SAD 500 Customs Pipeline",
      default_exchange_rate: DEFAULT_BURS_EXCHANGE_RATE,
      endpoint: "/api/parse-customs"
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const rawText = body.text || body.content || "";
    const fileName = body.fileName || "commercial_invoice.pdf";
    const exchangeRate = parseFloat(body.exchangeRate) || DEFAULT_BURS_EXCHANGE_RATE;

    const declaration = extractAndCalculateDeclaration(rawText, fileName, exchangeRate);
    return res.status(200).json(declaration);
  } catch (error) {
    console.error("API parse error:", error);
    return res.status(500).json({ error: "Failed to parse customs document", details: error.message });
  }
}
