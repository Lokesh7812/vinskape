"use client";

import { useState } from "react";

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

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="cnt-success">
        <div className="cnt-success-icon">✓</div>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
        <button className="button light" onClick={() => setSubmitted(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
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
              <option key={s} value={s}>
                {s}
              </option>
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
  );
}
