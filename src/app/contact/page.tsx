import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import type { Metadata } from "next";
import { getContactData } from "@/sanity/lib/data";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us | VINSKAPE Interior Design",
  description: "Get in touch with Vinskape for inquiries, consultations, and interior design quotes.",
};

export default async function ContactPage() {
  const data = await getContactData();

  const contactInfo = [
    { icon: "📞", label: "Phone", value: data.phone, href: `tel:${data.phone.replace(/[^0-9+]/g, "")}` },
    {
      icon: "💬",
      label: "WhatsApp",
      value: data.whatsapp,
      href: `https://wa.me/${data.whatsapp.replace(/[^0-9]/g, "")}`,
    },
    { icon: "✉️", label: "Email", value: data.email, href: `mailto:${data.email}` },
    {
      icon: "📍",
      label: "Address",
      value: data.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(data.address)}`,
    },
    { icon: "🕐", label: "Working Hours", value: data.workingHours, href: "#" },
  ];

  return (
    <main>
      <PageHero
        eyebrow={data.heroEyebrow}
        title={data.heroTitle}
        titleAccent={data.heroTitleAccent}
        subtitle={data.heroSubtitle}
      />

      <section className="cnt-section shell">
        <div className="cnt-grid">
          {/* Contact Info */}
          <div className="cnt-info">
            <p className="eyebrow dark">GET IN TOUCH</p>
            <h2>{data.heading} <em>{data.headingAccent}</em></h2>
            <p className="cnt-info-desc">{data.description}</p>
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
                {data.instagram && (
                  <a
                    href={data.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="cnt-social-btn"
                  >
                    Instagram
                  </a>
                )}
                {data.facebook && (
                  <a
                    href={data.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="cnt-social-btn"
                  >
                    Facebook
                  </a>
                )}
                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="cnt-social-btn"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="cnt-form-wrap">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="cnt-map">
        <div className="cnt-map-inner">
          <div className="cnt-map-overlay">
            <h3>Visit Our Studio</h3>
            <p>{data.address || "Kochi, Kerala · India"}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
