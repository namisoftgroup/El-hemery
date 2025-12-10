import { useTranslation } from "react-i18next";
import useGetSettings from "../../hooks/useSettings";

export default function About() {
  const { data, isLoading, error } = useGetSettings();
  const { t } = useTranslation();

  if (isLoading) return <p style={{ textAlign: "center" }}>جاري التحميل...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>حدث خطأ في تحميل البيانات</p>;

  const cards = [
    {
      icon: "fas fa-bullseye",
      title: t("about.goals"),
      desc: data?.goals_text,
    },
    {
      icon: "fas fa-gem",
      title: t("about.values"),
      desc: data?.value_text,
    },
    {
      icon: "fas fa-paper-plane",
      title: t("about.mission"),
      desc: data?.mission_text,
    },
    {
      icon: "fas fa-eye",
      title: t("about.vision"),
      desc: data?.vision_text,
    },
  ];

  return (
    <section className="about-section" id="about">
      <div className="container">

        <div className="about-company">
          <h2 className="about-title">{t("about.company_title")}</h2>

          <div
            dangerouslySetInnerHTML={{ __html: data?.about_company_text }}
          />
        </div>

        <div className="hero-cards">
          {cards.map((card, idx) => (
            <div className="card" key={idx}>
              <div className="icon">
                <i className={card.icon}></i>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <div
                className="card-desc"
                dangerouslySetInnerHTML={{ __html: card.desc }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
