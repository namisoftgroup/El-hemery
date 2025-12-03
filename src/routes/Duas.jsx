import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";

const DUA_LIST = [
  {
    id: "ihram",
    title: "دعاء الإحرام",
    arabic: "اللَّهُمَّ إِنِّي أَحْرَمْتُ بِحَجٍ/بِعُمْرَةٍ فَتَقَبَّلْهُ مِنِّي",
  },
  {
    id: "talbiyah",
    title: "التلبية",
    arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ...",
  },
  {
    id: "enter-makkah",
    title: "دعاء دخول مكة",
    arabic: "اللهم اجعلها خيرا وبارك لنا فيها",
  },
  {
    id: "enter-haram",
    title: "دعاء دخول المسجد الحرام",
    arabic: "اللهم افتح لي أبواب رحمتك",
  },
  {
    id: "safar",
    title: "دعاء السفر",
    arabic:
      "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى...",
  },
];

function getQiblaDirection(lat, lon) {
  const kaabaLat = 21.4225 * (Math.PI / 180);
  const kaabaLon = 39.8262 * (Math.PI / 180);

  const userLat = lat * (Math.PI / 180);
  const userLon = lon * (Math.PI / 180);

  const longDiff = kaabaLon - userLon;

  const y = Math.sin(longDiff);
  const x =
    Math.cos(userLat) * Math.tan(kaabaLat) -
    Math.sin(userLat) * Math.cos(longDiff);

  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
}

export default function Duas() {
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const qibla = getQiblaDirection(latitude, longitude);
        setDegree(qibla);
      },
      () => {
        console.warn("GPS not allowed");
      }
    );
  }, []);

  return (
    <main className="duas-page">
      <PageHeader
        title=" أدعية الحج والعمرة"
        subtitle=" أدعية ثابتة ومختصرة — للقراءة أثناء المناسك"
      />

      <div className="container">
        <div className="duas-grid">
          <aside className="duas-compass">
            <div className="compass-card">

              <div
                className="compass-rotate"
                style={{ transform: `rotate(${degree}deg)` }}
              >
                <img src="/icons/qiblah.svg" className="compass-base" alt="البوصلة" />
                <img src="/icons/arr.svg" className="compass-arrow" alt="السهم" />
              </div>

              <div className="compass-meta">
                <h4>البوصلة</h4>
                <small>اتجاه القبلة حسب موقعك الحالي</small>
              </div>
            </div>
          </aside>


          <section className="duas-list">
            {DUA_LIST.map((d) => (
              <article key={d.id} className="dua-card">
                <div className="dua-head">
                  <h3>{d.title}</h3>
                </div>
                <p className="dua-ar">{d.arabic}</p>
              </article>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
