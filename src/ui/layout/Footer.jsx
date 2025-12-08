import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // روابط السكشنات زي الهيدر
  const quickLinks = [
    { title: t("footer.quickLinks.home"), href: "#hero" },
    { title: t("footer.quickLinks.about"), href: "#about" },
    { title: t("footer.quickLinks.services"), href: "#services" },
    { title: t("footer.quickLinks.faqs"), href: "/faqs" },
  ];

  const contact = [
    { icon: "fa-phone", text: t("footer.contact.phone"), href: "tel:+966501234567" },
    { icon: "fa-envelope", text: t("footer.contact.email"), href: "mailto:info@alhemery.com" },
    { icon: "fa-location-dot", text: t("footer.contact.address"), href: "#" },
  ];

  const socials = [
    { icon: "fa-facebook", href: "#", label: t("footer.social.facebook") },
    { icon: "fa-twitter", href: "#", label: t("footer.social.twitter") },
    { icon: "fa-instagram", href: "#", label: t("footer.social.instagram") },
    { icon: "fa-whatsapp", href: "#", label: t("footer.social.whatsapp") },
  ];

  // Scroll سلس للسكشنات
  const handleScroll = (href) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row footer-grid">

            {/* Company Info */}
            <div className="col-lg-4 col-md-4 col-6 footer-col">
              <div className="footer-logo">
                <img src="/images/logo.svg" alt="الحميري" />
              </div>
              <p className="footer-desc">{t("footer.description")}</p>

              <div className="footer-socials">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="social-link"
                    title={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`fa-brands ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-4 col-md-4 col-6 footer-col">
              <h4 className="footer-title">{t("footer.titles.quickLinks")}</h4>
              <ul className="footer-list">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        className="footer-link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleScroll(link.href);
                        }}
                      >
                        <i className="fa-solid fa-angles-left arrow-icon"></i>
                        {link.title}
                      </a>
                    ) : (
                      <Link to={link.href} className="footer-link">
                        <i className="fa-solid fa-angles-left arrow-icon"></i>
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

            </div>

            {/* Contact */}
            <div className="col-lg-4 col-md-4 col-6 footer-col">
              <h4 className="footer-title">{t("footer.titles.contact")}</h4>
              <ul className="footer-contact">
                {contact.map((item, i) => (
                  <li key={i}>
                    <a href={item.href}>
                      <i className={`fa-solid ${item.icon}`}></i>
                      <span>{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>{t("footer.rights")} © {currentYear}</p>

            <div className="footer-links">
              <Link to="/terms-conditions">{t("footer.bottom.privacy")}</Link>
              <span className="divider">|</span>

              <Link to="/">{t("footer.bottom.terms")}</Link>
              <span className="divider">|</span>

              <Link to="/contact">{t("footer.bottom.contact")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
