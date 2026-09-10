"use client";

import { useState } from "react";
import Link from "next/link";

const projectTypes = [
  "2BHK / 3BHK Interior",
  "Luxury Villa",
  "Commercial / Office",
  "Modular Kitchen",
  "Complete Renovation",
];

type ContactProps = {
  contact?: {
    phone?: string;
    whatsapp?: string;
    whatsappMessage?: string;
    email?: string;
    address?: string;
    hours?: string;
    instagram?: string;
  };
};

export function HomeContact({ contact }: ContactProps) {
  const phone = contact?.phone || "+91 81110 00245";
  const whatsapp = contact?.whatsapp || "+91 81110 00245";
  const email = contact?.email || "studio@vinskape.in";
  const address =
    contact?.address ||
    "S.No.75 Ponmar Kandigai Road, Opposite Jones Castle Valley, Vengadamangalam, Chennai - 600127";
  const hours = contact?.hours || "Mon–Sat, 09:30 AM – 07:00 PM";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const cleanWa = whatsapp.replace(/[^0-9]/g, "");

  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Vinskape, I would like to inquire about interior design for: ${selectedType}. Name: ${formData.name || "Client"}, Phone: ${formData.phone || "Not provided"}`
  );

  return (
    <section className="home-contact" id="contact">
      <div className="home-contact-glow" />
      <div className="shell">
        <div className="home-contact-layout">
          {/* Left Column: Direct Studio Information */}
          <div className="home-contact-info">
            <div className="home-contact-badge">
              <span className="badge-dot" />
              <span>START A CONVERSATION</span>
            </div>

            <h2 className="home-contact-title">
              Bring us the beginning <br />
              of an <em>idea.</em>
            </h2>

            <p className="home-contact-lead">
              Whether you are planning a new residence, an inspiring workspace,
              or a bespoke interior transformation in Chennai, our principal
              designers are ready to collaborate.
            </p>

            <div className="home-contact-cards">
              {/* Phone Card */}
              <a
                href={`tel:${cleanPhone}`}
                className="hc-card"
                title="Call Vinskape Studio"
              >
                <div className="hc-icon-wrap">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="hc-card-text">
                  <span className="hc-label">Direct Studio Phone</span>
                  <strong className="hc-val">{phone}</strong>
                  <span className="hc-sub">{hours}</span>
                </div>
                <span className="hc-arrow">↗</span>
              </a>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                  "Hi Vinskape team, I would like to schedule a design consultation for my space."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="hc-card hc-card-highlight"
                title="Chat on WhatsApp"
              >
                <div className="hc-icon-wrap hc-icon-wa">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="hc-card-text">
                  <span className="hc-label">Instant WhatsApp Chat</span>
                  <strong className="hc-val">{whatsapp}</strong>
                  <span className="hc-sub">Direct quotation & portfolio chat</span>
                </div>
                <span className="hc-arrow">↗</span>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${email}`}
                className="hc-card"
                title="Email Vinskape Studio"
              >
                <div className="hc-icon-wrap">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="hc-card-text">
                  <span className="hc-label">Design Briefs & Email</span>
                  <strong className="hc-val">{email}</strong>
                  <span className="hc-sub">Send floor plans & inquiries</span>
                </div>
                <span className="hc-arrow">↗</span>
              </a>

              {/* Location Card */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
                className="hc-card"
                title="View on Google Maps"
              >
                <div className="hc-icon-wrap">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="hc-card-text">
                  <span className="hc-label">Chennai Studio & Experience</span>
                  <strong className="hc-val hc-val-sm">{address}</strong>
                  <span className="hc-sub">Opp. Jones Castle Valley, Vengadamangalam</span>
                </div>
                <span className="hc-arrow">↗</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="hc-highlights">
              <div className="hc-highlight-item">
                <span className="hc-highlight-check">✓</span>
                <span>Free Initial Consultation</span>
              </div>
              <div className="hc-highlight-item">
                <span className="hc-highlight-check">✓</span>
                <span>24+ Authorized Brand Dealerships</span>
              </div>
              <div className="hc-highlight-item">
                <span className="hc-highlight-check">✓</span>
                <span>3D Visualization & Turnkey Handover</span>
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="home-contact-form-panel">
            <div className="hc-form-container">
              {submitted ? (
                <div className="hc-success-box">
                  <div className="hc-success-icon">✓</div>
                  <h3>Thank You for Reaching Out!</h3>
                  <p>
                    Your project consultation request has been received. Our lead
                    interior designer will review your requirements and reach out
                    within 24 hours.
                  </p>
                  <div className="hc-success-actions">
                    <a
                      href={`https://wa.me/918111000245?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="button light"
                    >
                      Chat on WhatsApp Now <span>↗</span>
                    </a>
                    <button
                      type="button"
                      className="hc-reset-btn"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="hc-form">
                  <div className="hc-form-header">
                    <span className="hc-form-eyebrow">GET A QUOTE / BOOK CONSULTATION</span>
                    <h3 className="hc-form-heading">Tell us about your space</h3>
                    <p className="hc-form-subtitle">
                      Share your requirement and receive an initial estimate & concept consultation.
                    </p>
                  </div>

                  {/* Project Type Selector */}
                  <div className="hc-pills-wrap">
                    <label className="hc-pills-label">Select Space Type</label>
                    <div className="hc-pills">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`hc-pill ${selectedType === type ? "active" : ""}`}
                          onClick={() => setSelectedType(type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="hc-fields-grid">
                    <div className="hc-field">
                      <label htmlFor="hc-name">Full Name *</label>
                      <input
                        id="hc-name"
                        type="text"
                        placeholder="e.g. Arvind Kumar"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="hc-field">
                      <label htmlFor="hc-phone">Phone Number *</label>
                      <input
                        id="hc-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="hc-field">
                    <label htmlFor="hc-email">Email Address</label>
                    <input
                      id="hc-email"
                      type="email"
                      placeholder="arvind@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="hc-field">
                    <label htmlFor="hc-message">Project Details / Location in Chennai</label>
                    <textarea
                      id="hc-message"
                      rows={3}
                      placeholder="e.g. 3BHK flat at OMR, need complete modular kitchen, wardrobe & false ceiling within 45 days..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <div className="hc-actions">
                    <button type="submit" className="button light hc-submit-btn">
                      Request Design Consultation <span>→</span>
                    </button>
                  </div>

                  <div className="hc-or-divider">
                    <span>or connect instantly</span>
                  </div>

                  <a
                    href={`https://wa.me/${cleanWa}?text=Hi%20Vinskape%20team%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20my%20interior%20project.`}
                    target="_blank"
                    rel="noreferrer"
                    className="hc-wa-direct-btn"
                  >
                    <span>💬</span> Chat with us on WhatsApp
                  </a>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
