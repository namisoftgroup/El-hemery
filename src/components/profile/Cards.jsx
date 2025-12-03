import { useTranslation } from "react-i18next";

export default function Cards({ user }) {
    const { t } = useTranslation();

  return (
    <div className="cards-row">
 <div className="personal-card">
      <h2 className="section-title">{t("profileCards.basicInfo")}</h2>
      <ul className="personal-list">
        <li>
          <span className="label">{t("profileCards.busSeat")}:</span>
          <span className="val">{user.bus_position}</span>
        </li>
        <li>
          <span className="label">{t("profileCards.name")}:</span>
          <span className="val">{user.name}</span>
        </li>
        <li>
          <span className="label">{t("profileCards.arafatPlace")}:</span>
          <span className="val">{user.arafat_place}</span>
        </li>
        <li>
          <span className="label">{t("profileCards.muzdalifahPlace")}:</span>
          <span className="val">{user.muzdalifah_place}</span>
        </li>
      </ul>
    </div>

      <div className="right-card">
        <div className="supervisors-card">
<h2 className="section-title">{t("profile.supervisors")}</h2>
          <div className="supervisors-list compact">
            {user.supervisors?.map((s) => (
              <div className="supervisor-row" key={s.id}>
                <a href={`tel:${s.phone}`} className="call-icon">
                  <i className="fa-solid fa-phone"></i>
                </a>
                <div className="supervisor-info">
                  <div className="supervisor-name">{s.name}</div>
                  <div className="supervisor-position">{s.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="companions-list compact">
          {user.companions?.map((companion, index) => (
            <div className="companion-item" key={index}>
              {companion.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
