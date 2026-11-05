'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit us',
    lines: ['House 12, Road 5, Banani', 'Dhaka 1213, Bangladesh'],
  },
  {
    icon: Phone,
    title: 'Call us',
    lines: ['+880 1712 345678', '+880 1812 345678'],
  },
  {
    icon: Mail,
    title: 'Email us',
    lines: ['hello@wanderlast.com', 'booking@wanderlast.com'],
  },
];

export function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact-us"
      className="scroll-mt-20 bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-10">
        <p className="text-center text-3xl text-[#e61a4f] [font-family:var(--font-hand)] sm:text-4xl">
          Get in touch
        </p>
        <h2 className="mt-1 text-center text-3xl font-extrabold text-foreground sm:text-4xl">
          Contact Us
        </h2>
        <p className="mt-3 text-center text-sm text-foreground/60">
          Questions about a studio or a booking? Write to us — we reply fast.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact info cards */}
          <div className="space-y-5">
            {contactCards.map(({ icon: Icon, title, lines }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-[#e3e7ec] bg-white p-5 transition-all duration-300 hover:border-[#e61a4f]/40 hover:shadow-md"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e61a4f]/10">
                  <Icon className="size-5 text-[#e61a4f]" aria-hidden />
                </span>
                <div>
                  <h3 className="font-extrabold text-foreground">{title}</h3>
                  {lines.map((line) => (
                    <p key={line} className="mt-0.5 text-sm text-foreground/60">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Message form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#e3e7ec] bg-white p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-sm font-semibold">
                  Your name
                </label>
                <input
                  id="contact-name"
                  required
                  value={form.name}
                  onChange={setField('name')}
                  placeholder="e.g. Rafi Ahmed"
                  className="h-11 rounded-md border border-[#e3e7ec] bg-[#f7f8fa] px-3 text-sm outline-none transition-colors focus:border-[#e61a4f]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-sm font-semibold">
                  Your email
                </label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  value={form.email}
                  onChange={setField('email')}
                  placeholder="you@example.com"
                  className="h-11 rounded-md border border-[#e3e7ec] bg-[#f7f8fa] px-3 text-sm outline-none transition-colors focus:border-[#e61a4f]"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-sm font-semibold">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={form.message}
                onChange={setField('message')}
                placeholder="Tell us what you need — studio type, date, duration…"
                className="rounded-md border border-[#e3e7ec] bg-[#f7f8fa] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#e61a4f]"
              />
            </div>

            {sent ? (
              <p
                role="status"
                className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-600"
              >
                Message sent — we will get back to you soon!
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e61a4f] px-10 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#c9123f]"
            >
              <Send className="size-4" aria-hidden />
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
