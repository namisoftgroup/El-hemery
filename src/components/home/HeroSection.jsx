import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function HeroSection() {
    const [fade, setFade] = useState(false);

    const slides = [
        "/images/h1.png",
        "/images/h2.png",
        "/images/3.png",
    ];

    useEffect(() => {
        setTimeout(() => setFade(true), 200);
    }, []);

    return (
        <section className={`hero-section ${fade ? "fade-in" : ""}`}>
            {/* SLIDER BACKGROUND */}
            <Swiper
                slidesPerView={1}
                loop={true}
                centeredSlides={true}
                modules={[Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                className="hero-bg-slider"
            >
                {slides.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <div
                            className="slide-bg"
                            style={{
                                backgroundImage: `url(${img})`,
                              
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="overlay" />

            <div className="hero-content">
                <h1 className="hero-title">
                    رحلتك الإيمانية
                    <span>تبدأ من هنا</span>
                </h1>

                <p className="hero-sub">
                    نقدم في الحميري خدمات حج وعمرة متكاملة
                    بأعلى معايير الراحة والأمان لضيوف الرحمن.
                </p>

                <div className="hero-btns">
                    <button className="primary-btn">احجز الآن</button>
                    <button className="secondary-btn">تواصل معنا</button>
                </div>
            </div>

            {/* COUNTERS */}
            <div className="hero-stats">
                <div className="stat-box">
                    <h2>15+</h2>
                    <p>سنة خبرة</p>
                </div>
                <div className="stat-box">
                    <h2>10,000+</h2>
                    <p>حاج ومعتمر</p>
                </div>
                <div className="stat-box">
                    <h2>12 دولة</h2>
                    <p>عملاء حول العالم</p>
                </div>
            </div>
        </section>
    );
}
