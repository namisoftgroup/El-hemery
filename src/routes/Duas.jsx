import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader.jsx";
import useGetSupplication from "../hooks/profile/useGetSupplication.js";
import DuaSkeleton from "../ui/loaders/DuaSkeleton.jsx";

// حساب اتجاه القبلة
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

// التحقق من نوع الجهاز
function isMobileDevice() {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

export default function Duas() {
  const { t } = useTranslation();

  const [qiblaDegree, setQiblaDegree] = useState(0);
  const [deviceDegree, setDeviceDegree] = useState(0);
  const [iosNeedsPermission, setIosNeedsPermission] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: Supplication, isLoading } = useGetSupplication();

  useEffect(() => {
    setIsMobile(isMobileDevice());

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const qibla = getQiblaDirection(latitude, longitude);
        setQiblaDegree(qibla);
      },
      () => console.warn("GPS not allowed")
    );
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      setIosNeedsPermission(true);
    } else {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [isMobile]);

  const handleDeviceOrientation = (event) => {
    let heading = null;
    if (event.webkitCompassHeading !== undefined) {
      heading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      heading = 360 - event.alpha;
    }
    if (heading !== null && !isNaN(heading)) setDeviceDegree(heading);
  };

  const requestIOSPermission = async () => {
    try {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission === "granted") {
        setIosNeedsPermission(false);
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      }
    } catch (err) {
      console.warn("Permission denied", err);
    }
  };

  const finalRotation = isMobile ? qiblaDegree - deviceDegree : qiblaDegree;

  return (
    <main className="duas-page">
      <PageHeader
        title={t("duasPage.title")}
        subtitle={t("duasPage.subtitle")}
      />

      <div className="container">
        <div className="duas-grid">
          {/* البوصلة */}
          <aside className="duas-compass">
            <div className="compass-card">
              {iosNeedsPermission && (
                <button
                  className="btn btn-primary"
                  onClick={requestIOSPermission}
                >
                  {t("duasPage.enableCompass")}
                </button>
              )}

              <div
                className="compass-rotate"
                style={{ transform: `rotate(${finalRotation}deg)` }}
              >
                <img
                  src="/icons/qiblah.svg"
                  className="compass-base"
                  alt={t("duasPage.compassAlt")}
                />
                <img
                  src="/icons/arr.svg"
                  className="compass-arrow"
                  alt={t("duasPage.arrowAlt")}
                />
              </div>

              <div className="compass-meta">
                <h4>{t("duasPage.compassTitle")}</h4>
                <small>{t("duasPage.compassDesc")}</small>
              </div>
            </div>
          </aside>

          {/* الأدعية */}
          <section className="duas-list">
            {isLoading ? (
              <>
                <DuaSkeleton />
              </>
            ) : (
              Supplication?.map((supply) => (
                <article key={supply.id} className="dua-card">
                  <div className="dua-head">
                    <h3>{supply.title}</h3>
                  </div>
                  <p className="dua-ar">{supply.description}</p>
                </article>
              ))
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
