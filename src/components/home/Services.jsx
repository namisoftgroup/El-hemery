import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import useGetServices from "../../hooks/home/useGetServices";

export default function ServicesSection() {
  const { t } = useTranslation();
  const orbitRef = useRef(null);
  const { data: services = [], isLoading } = useGetServices();

  const [rotation, setRotation] = useState(0);
  const [orbitSize, setOrbitSize] = useState({ width: 0, height: 0, radius: 0 });

  useEffect(() => {
    if (orbitRef.current) {
      const w = orbitRef.current.offsetWidth;
      const h = orbitRef.current.offsetHeight;
      const r = w / 2 + 30;
      setOrbitSize({ width: w, height: h, radius: r });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((r) => r + 0.1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section className="services-section">
        <h2 className="title">{t("services.title")}</h2>
        <p className="subtitle">{t("services.loading")}</p>
      </section>
    );
  }

  if (!services.length) return null;

  return (
    <section className="services-section" id="services">
      <h2 className="title">{t("services.title")}</h2>
      <p className="subtitle">{t("services.subtitle")}</p>
      <div className="service-wrapper">

        <div className="center-half-circle">
          <img
            src={services[Math.floor(rotation) % services.length].icon}
            className="service-icon"
            alt={services[Math.floor(rotation) % services.length].title}
          />
          <h3>{t(`services.items.${Math.floor(rotation) % services.length}.title`, { defaultValue: services[Math.floor(rotation) % services.length].title })}</h3>
          <p>{t(`services.items.${Math.floor(rotation) % services.length}.description`, { defaultValue: services[Math.floor(rotation) % services.length].description })}</p>
        </div>

        <div className="orbit" ref={orbitRef}>
          {services.map((item, i) => {
            const activeIndex = Math.floor(rotation) % services.length;
            const indexDiff = i - activeIndex;
            const angle = ((2 * Math.PI) / services.length) * indexDiff - Math.PI / 2;
            const cx = orbitSize.width / 2;
            const cy = orbitSize.height;
            const left = cx + Math.cos(angle) * orbitSize.radius;
            const top = cy + Math.sin(angle) * orbitSize.radius;

            return (
              <div
                key={item.id}
                className={`orbit-item ${activeIndex === i ? "active" : ""}`}
                style={{
                  left: `${left}px`,
                  top: `${top}px`,
                  transition: "all 0.5s linear",
                }}
              >
                <div className="icon-wrap">
                  <img src={item.icon} alt={item.title} />
                  <span>{t(`services.items.${i}.title`, { defaultValue: item.title })}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
