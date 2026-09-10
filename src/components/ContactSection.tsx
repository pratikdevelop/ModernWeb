import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Mail, User, MessageSquare } from 'lucide-react';
import { AdBanner } from './AdBanner';

interface ContactSectionProps {
  isConsentGranted: boolean;
  onOpenPro: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isConsentGranted,
  onOpenPro,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '';

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!name.trim()) {
      errs.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      errs.email = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid business email address';
    }

    if (!message.trim()) {
      errs.message = 'Project description is required';
    } else if (message.trim().length < 20) {
      errs.message = 'Please provide at least 20 characters describing your project goals';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      if (endpoint && endpoint.startsWith('http')) {
        // If a real Formspree or custom API route is configured
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });

        if (!res.ok) throw new Error('Failed to submit');
      } else {
        // Simulate robust API submission
        await new Promise((resolve) => setTimeout(resolve, 1400));
      }

      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch {
      setErrors({ message: 'Submission failed. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Pre-Contact In-Article Ad Banner */}
        <AdBanner
          id="ad-banner-precontact"
          position="pre-contact"
          isConsentGranted={isConsentGranted}
          onUpgradeClick={onOpenPro}
          className="mb-16"
        />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D4AA]/15 border border-[#00D4AA]/30 text-xs font-semibold text-[#00D4AA] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Enterprise Consultation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-kreon leading-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#20B2AA]">Transform</span> Your Business?
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Let's discuss how ModernWeb's intelligent platform can scale your content pipelines, streamline engineering velocity, and maximize ad revenues.
          </p>
        </div>

        <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative">
          {isSuccess ? (
            <div
              role="alert"
              aria-live="polite"
              className="py-10 text-center animate-fade-in space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-kreon">
                Transformation Started! 🚀
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you! Our enterprise solution architects will review your project requirements and be in touch within 24 hours.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-[#FFD700]" /> Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Enter your full name"
                  className={`w-full p-3.5 rounded-xl bg-black/30 border text-white text-sm placeholder-gray-500 transition-all focus:outline-none ${
                    errors.name
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-white/15 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]'
                  }`}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#20B2AA]" /> Business Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="name@company.com"
                  className={`w-full p-3.5 rounded-xl bg-black/30 border text-white text-sm placeholder-gray-500 transition-all focus:outline-none ${
                    errors.email
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-white/15 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]'
                  }`}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#FF8A65]" /> Project Goals & Requirements *
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="Describe your project, timeline, target user scale, or monetization inquiries..."
                  className={`w-full p-3.5 rounded-xl bg-black/30 border text-white text-sm placeholder-gray-500 transition-all focus:outline-none resize-none ${
                    errors.message
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-white/15 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]'
                  }`}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#FF8A65] to-[#FFD700] text-[#1A1A2E] font-extrabold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#1A1A2E] border-t-transparent rounded-full animate-spin" />
                    <span>Processing Your Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Start Your Transformation</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                Strict enterprise privacy. We never sell your contact information.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
