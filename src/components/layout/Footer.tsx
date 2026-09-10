import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="shell footer-top">
        <div>
          <h2>VINSKAPE</h2>
          <p>Crafting Spaces. Defining Lifestyles.</p>
        </div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/dealerships">Our Dealerships</Link>
          <Link href="/products">Products</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-contact" style={{ maxWidth: "340px", fontSize: "13px", lineHeight: "1.6" }}>
          <p style={{ margin: "0 0 8px 0" }}>
            <a href="tel:+918111000245" style={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>
              📞 +91 81110 00245
            </a>
          </p>
          <p style={{ margin: "0 0 8px 0", color: "#b8b2a7" }}>
            📍 S.No.75 Ponmar Kandigai Road, Opposite Jones Castle Valley, Vengadamangalam, Chennai - 600127
          </p>
          <p style={{ margin: 0 }}>
            <a href="mailto:studio@vinskape.in" style={{ color: "inherit", textDecoration: "none" }}>
              ✉️ studio@vinskape.in
            </a>
          </p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 VINSKAPE. All rights reserved.</span>
        <span>
          <a
            href="https://www.instagram.com/vinskape?igsi=MXQwYW5qZHYyMDFpaA=="
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Instagram
          </a>{" "}
          · Facebook · LinkedIn
        </span>
      </div>
    </footer>
  );
}
