"use client";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";

const contactInfo = [
  { icon: "📞", label: "Phone", value: "+91 81110 00245", href: "tel:+918111000245" },
  { icon: "💬", label: "WhatsApp", value: "+91 81110 00245", href: "https://wa.me/918111000245" },
  { icon: "✉️", label: "Email", value: "studio@vinskape.in", href: "mailto:studio@vinskape.in" },
  {
    icon: "📍",
    label: "Address",
    value: "S.No.75 Ponmar Kandigai Road, Opposite Jones Castle Valley, Vengadamangalam, Chennai - 600127",
    href: "https://maps.google.com/?q=S.No.75+Ponmar+Kandigai+Road,+Opposite+Jones+Castle+Valley,+Vengadamangalam,+Chennai+-+600127"
  },
  { icon: "🕐", label: "Working Hours", value: "Mon–Sat, 09:30–19:00", href: "#" },
];

const serviceOptions = [
  "Residential – 2BHK Interior",
  "Residential – 3BHK Interior",
  "Residential – 4BHK Interior",
  "Residential – Villa",
  "Residential – Bungalow",
  "Commercial – Office",
  "Commercial – Retail",
  "Commercial – Hospitality",
  "Commercial – Healthcare",
  "Enterprise – Corporate Office",
  "Enterprise – Collaborative Workspace",
  "Products – Furniture",
  "Products – Curtains",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        eyebrow="CONTACT VINSKAPE"
        title="Bring us the beginning"
        titleAccent="of an idea."
        subtitle="Whether it's a question, a concept, or a complete brief — we'd love to hear from you."
      />

      <section className="cnt-section shell">
        <div className="cnt-grid">
          {/* Contact Info */}
          <div className="cnt-info">
            <p className="eyebrow dark">GET IN TOUCH</p>
            <h2>Let&apos;s start a <em>conversation.</em></h2>
            <p className="cnt-info-desc">
              Reach out to us through any of the channels below, or fill out the form and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="cnt-details">
              {contactInfo.map((c) => (
                <a href={c.href} className="cnt-detail" key={c.label}>
                  <span className="cnt-detail-icon">{c.icon}</span>
                  <div>
                    <small>{c.label}</small>
                    <span>{c.value}</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="cnt-social">
              <p className="eyebrow dark">FOLLOW US</p>
              <div className="cnt-social-links">
                <a
                  href="https://www.instagram.com/vinskape?igsi=MXQwYW5qZHYyMDFpaA=="
                  target="_blank"
                  rel="noreferrer"
                  className="cnt-social-btn"
                >
                  Instagram
                </a>
                <a href="#" className="cnt-social-btn">Facebook</a>
                <a href="#" className="cnt-social-btn">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="cnt-form-wrap">
            {submitted ? (
              <div className="cnt-success">
                <div className="cnt-success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className="button light" onClick={() => setSubmitted(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="cnt-form" onSubmit={handleSubmit}>
                <h3>Send us a message</h3>
                <div className="cnt-form-row">
                  <div className="cnt-field">
                    <label htmlFor="cnt-name">Full Name</label>
                    <input
                      id="cnt-name"
                      type="text"
                      placeholder="Your full name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="cnt-field">
                    <label htmlFor="cnt-email">Email</label>
                    <input
                      id="cnt-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="cnt-form-row">
                  <div className="cnt-field">
                    <label htmlFor="cnt-phone">Phone</label>
                    <input
                      id="cnt-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="cnt-field">
                    <label htmlFor="cnt-service">Service Interested In</label>
                    <select
                      id="cnt-service"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="cnt-field">
                  <label htmlFor="cnt-message">Message</label>
                  <textarea
                    id="cnt-message"
                    rows={5}
                    placeholder="Tell us about your project..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="button light cnt-submit">
                  Send Message <span>↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="cnt-map">
        <div className="cnt-map-inner">
          <div className="cnt-map-overlay">
            <h3>Visit Our Studio</h3>
            <p>Kochi, Kerala · India</p>
          </div>
        </div>
      </section>
    </main>
  );
}
