import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function ServicesCTA() {
  const { t } = useTranslation();

  return (
    <div className="faq-cta">
      <div className="cta-content">
        <h3>{t("faqs.ctaTitle")}</h3>
        <p>{t("faqs.ctaSubtitle")}</p>

        <div className="cta-buttons">
          <Link to="/contact" className="btn btn-primary">
            <i className="fa-solid fa-phone"></i>
            {t("faqs.callUs")}
          </Link>

          <Link to="/contact" className="btn btn-secondary">
            <i className="fa-solid fa-envelope"></i>
            {t("faqs.sendMessage")}
          </Link>
        </div>
      </div>
    </div>
  );
}
