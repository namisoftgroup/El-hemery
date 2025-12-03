
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: "الرئيسية", href: "#" },
    { title: "عن الحميري", href: "#" },
    { title: "الخدمات", href: "#" },
    { title: "الباقات", href: "#" },
  ];

  const services = [
    { title: "حج", href: "#" },
    { title: "عمرة", href: "#" },
    { title: "استشارات", href: "#" },
    { title: "رحلات دينية", href: "#" },
  ];

  const contact = [
    { icon: "fa-phone", text: "+966 50 123 4567", href: "tel:+966501234567" },
    { icon: "fa-envelope", text: "info@alhemery.com", href: "mailto:info@alhemery.com" },
    { icon: "fa-location-dot", text: "الرياض، المملكة العربية السعودية", href: "#" },
  ];

  const socials = [
    { icon: "fa-facebook", href: "#", label: "فيسبوك" },
    { icon: "fa-twitter", href: "#", label: "تويتر" },
    { icon: "fa-instagram", href: "#", label: "انستقرام" },
    { icon: "fa-whatsapp", href: "#", label: "واتس آب" },
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
              <p className="footer-desc">
                نقدم خدمات حج وعمرة متكاملة بأعلى معايير الراحة والأمان لضيوف الرحمن منذ 15 سنة.
              </p>
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
              <h4 className="footer-title">روابط سريعة</h4>
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
              <h4 className="footer-title">الخدمات</h4>
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

            {/* Contact Info */}
  <div className="col-lg-3 col-md-4 col-6 footer-col">
              <h4 className="footer-title">تواصل معنا</h4>
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

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>جميع الحقوق محفوظة © {currentYear} الحميري للحج والعمرة</p>
            <div className="footer-links">
              <a href="#">سياسة الخصوصية</a>
              <span className="divider">|</span>
              <a href="#">شروط الاستخدام</a>
              <span className="divider">|</span>
              <a href="#">اتصل بنا</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}