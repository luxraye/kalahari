import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { createSupportTicketInFirestore } from '../firebase/dbService';

export default function ContactSection({ userProfile }) {
  const [formData, setFormData] = useState({
    name: userProfile.contactName || '',
    company: userProfile.company || '',
    contact: userProfile.email || userProfile.phone || '',
    service: 'Customs SAD 500 Pre-Lodgment Pilot',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      _subject: `New Kalahari.ai Inquiry from ${formData.name} (${formData.company})`
    };

    try {
      // 1. Log ticket in Cloud Firestore for Admin Support Desk
      try {
        await createSupportTicketInFirestore({
          client: formData.name,
          company: formData.company,
          contact: formData.contact,
          service: formData.service,
          subject: `${formData.service} Inquiry`,
          message: formData.message,
          priority: formData.service.includes('Customs') ? 'High' : 'Normal',
          status: 'Pending Review'
        });
      } catch (dbErr) {
        console.warn("Firestore ticket creation:", dbErr);
      }

      // 2. Dispatch via FormSubmit
      await fetch("https://formsubmit.co/ajax/gnakedi@bloodchain.life", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const whatsappText = encodeURIComponent(
        `Hi G. Nakedi, my name is ${formData.name} from ${formData.company}. I would like to consult on: ${formData.service}. Contact: ${formData.contact}. Message: ${formData.message}`
      );
      const whatsappUrl = `https://wa.me/26772161038?text=${whatsappText}`;

      setSubmitFeedback({
        success: true,
        whatsappUrl: whatsappUrl,
        message: `Inquiry saved & sent to gnakedi@bloodchain.life. G. Nakedi (+267 72161038) will review and reply within 2 business hours.`
      });
    } catch (err) {
      setSubmitFeedback({
        success: false,
        message: "Network issue. Please contact G. Nakedi directly on WhatsApp (+267 72161038) or email gnakedi@bloodchain.life."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200 mt-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Enterprise Pilot Consultation</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Direct Access to G. Nakedi</h2>
          <p className="text-slate-600 text-sm">Deploy an on-premise customs pipeline or subscribe your engineering firm to Friday Tender Radar.</p>
        </div>

        {/* Contact Coordinates Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Direct Line &amp; WhatsApp</div>
              <a href="tel:+26772161038" className="text-base font-bold text-slate-900 hover:text-sky-600 transition">+267 72161038</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Direct Email</div>
              <a href="mailto:gnakedi@bloodchain.life" className="text-sm font-bold text-slate-900 hover:text-sky-600 transition block break-all">gnakedi@bloodchain.life</a>
              <a href="mailto:taylith338@gmail.com" className="text-xs font-medium text-slate-500 hover:text-sky-600 transition block break-all mt-0.5">Alt: taylith338@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="e.g. Kagiso Molosiwa"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="e.g. Kalahari Logistics Ltd"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email / Phone Contact</label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="e.g. kmolosiwa@company.co.bw"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Area of Engagement</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 outline-none bg-white"
              >
                <option value="Customs SAD 500 Pre-Lodgment Pilot">Track 1: Customs SAD 500 Pre-Lodgment Pilot</option>
                <option value="Friday Tender Radar Subscription">Track 2: Friday Tender Radar Subscription</option>
                <option value="Custom On-Premise Document AI Deployment">Custom On-Premise Document AI Deployment</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Requirements or Invoice Volume</label>
            <textarea
              rows="3"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="Tell us about your weekly consignments or PPRA registration code..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>{isSubmitting ? "Dispatching..." : "Submit Consultation Request"}</span>
          </button>

          {submitFeedback && (
            <div className={`p-5 rounded-xl text-left border mt-4 ${submitFeedback.success ? 'bg-emerald-50 text-emerald-950 border-emerald-200' : 'bg-red-50 text-red-950 border-red-200'}`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-2 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Request Dispatched</span>
              </div>
              <p className="text-xs text-slate-700 mb-3">{submitFeedback.message}</p>
              {submitFeedback.whatsappUrl && (
                <a
                  href={submitFeedback.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect Directly on WhatsApp (+267 72161038)</span>
                </a>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
