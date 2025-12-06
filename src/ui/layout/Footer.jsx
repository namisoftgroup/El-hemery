import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: t("footer.quickLinks.home"), href: "#" },
    { title: t("footer.quickLinks.about"), href: "#" },
    { title: t("footer.quickLinks.services"), href: "#" },
    { title: t("footer.quickLinks.faqs"), href: "#" },
  ];

  const services = [
    { title: t("footer.services.hajj"), href: "#" },
    { title: t("footer.services.umrah"), href: "#" },
    { title: t("footer.services.consulting"), href: "#" },
    { title: t("footer.services.religiousTrips"), href: "#" },
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

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row footer-grid">

            {/* Company Info */}
            <div className="col-lg-3 col-md-4 col-6 footer-col">
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
            <div className="col-lg-3 col-md-4 col-6 footer-col">
              <h4 className="footer-title">{t("footer.titles.quickLinks")}</h4>
              <ul className="footer-list">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="footer-link">
                      <i className="fa-solid fa-angles-left arrow-icon"></i>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="col-lg-3 col-md-4 col-6 footer-col">
              <h4 className="footer-title">{t("footer.titles.services")}</h4>
              <ul className="footer-list">
                {services.map((service, i) => (
                  <li key={i}>
                    <a href={service.href} className="footer-link">
                      <i className="fa-solid fa-angles-left arrow-icon"></i>
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-4 col-6 footer-col">
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
              <a href="#">{t("footer.bottom.privacy")}</a>
              <span className="divider">|</span>
              <a href="#">{t("footer.bottom.terms")}</a>
              <span className="divider">|</span>
              <a href="#">{t("footer.bottom.contact")}</a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
