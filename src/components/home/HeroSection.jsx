import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import useGetHome from "../../hooks/home/useGetSlider";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const [fade, setFade] = useState(false);
  const { data: slides = [], isLoading } = useGetHome();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => setFade(true), 200);
  }, []);

  return (
    <section className={`hero-section ${fade ? "fade-in" : ""}`}>

      {/* slider images */}
      {!isLoading && slides.length > 0 && (
        <Swiper
          slidesPerView={1}
          loop={true}
          centeredSlides={true}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="hero-bg-slider"
        >
          {slides.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="slide-bg"
                style={{
                  backgroundImage: `url(${item.image})`, 
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="overlay" />

    <div className="hero-content">
  <h1 className="hero-title">
    {t("hero.title")}
    <span>{t("hero.subtitle")}</span>
  </h1>

  <p className="hero-sub">
    {t("hero.description")}
  </p>

  <div className="hero-btns">
    <button className="primary-btn">{t("hero.readMore")}</button>
    <button className="secondary-btn">{t("hero.contactUs")}</button>
  </div>
</div>

<div className="hero-stats">
  <div className="stat-box">
    <h2>15+</h2>
    <p>{t("hero.stats.experience")}</p>
  </div>
  <div className="stat-box">
    <h2>10,000+</h2>
    <p>{t("hero.stats.hajjPilgrims")}</p>
  </div>
  <div className="stat-box">
    <h2>12</h2>
    <p>{t("hero.stats.countries")}</p>
  </div>
</div>

    </section>
  );
}
