import { useTranslation } from "react-i18next";

export default function InfoCard({ user }) {
    const { t } = useTranslation();
  
  return (
    <div className="top-info-card">
      <div className="logo-section">
        <div className="logo-box">
          <img src={"/images/logo.svg"} alt={user.name} />
        </div>
      </div>

      <div className="info-grid">
      <div className="info-item">
        <span className="label">{t("profile.name")}</span>
        <span className="value">{user.name}</span>
      </div>

      <div className="info-item">
        <span className="label">{t("profile.idNumber")}</span>
        <span className="value">{user.id_number}</span>
      </div>

      <div className="info-item">
        <span className="label">{t("profile.groupNumber")}</span>
        <span className="value">{user.group}</span>
      </div>

      <div className="info-item">
        <span className="label">{t("profile.bookingNumber")}</span>
        <span className="value">{user.booking_number}</span>
      </div>
    </div>
    </div>
  );
}
