import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetLocations from "../../hooks/home/useGetLocations";
import useGetLocationDetails from "../../hooks/home/useGetLocationDetails";

const randomPos = () => ({
  left: Math.random() * 80 + 10 + "%",
  top: Math.random() * 70 + 15 + "%",
});

export default function LocationsMap() {
  const { t } = useTranslation();
  const { data: locationsData, isLoading } = useGetLocations();
  const [locations, setLocations] = useState([]);
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  const targetId = active || hovered;
  const { data: locationDetails, isLoading: detailsLoading } = useGetLocationDetails(targetId);

  useEffect(() => {
    if (locationsData) {
      setLocations(
        locationsData.map((loc) => ({
          ...loc,
          pos: randomPos(),
        }))
      );
    }
  }, [locationsData]);

  const enrichedLocations = locations.map((loc) =>
    loc.id === targetId && locationDetails
      ? { ...loc, ...locationDetails }
      : loc
  );

  const isMobile = () => window.innerWidth <= 768;

  const showCard = (id) =>
    isMobile() ? active === id || hovered === id : active === id || hovered === id;

  if (isLoading) {
    return (
      <section className="locations-section">
        <h2 className="title">{t("locations.title")}</h2>
        <div className="loading-text">{t("locations.loadingBranches")}</div>
      </section>
    );
  }

  return (
    <section className="locations-section">
      <h2 className="title">{t("locations.title")}</h2>

      <div className="container">
        <div className="map-bg">
          {enrichedLocations.map((loc) => (
            <div
              key={loc.id}
              className={`map-pin ${active === loc.id ? "clicked" : ""}`}
              style={loc.pos}
              onMouseEnter={() => setHovered(loc.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(loc.id)}
            >
              <div className="pin-dot"></div>
              <div className="pin-label">{loc.title}</div>

              {showCard(loc.id) && (
                <div className="pin-card" onClick={(e) => e.stopPropagation()}>
                  <div className="card-head">
                    <h4>{loc.title}</h4>
                    {active === loc.id && (
                      <button className="close-btn" onClick={() => setActive(null)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    )}
                  </div>

                  {detailsLoading && (
                    <div className="loading-text">{t("locations.loadingDetails")}</div>
                  )}

                  {!detailsLoading && loc.supervisors && (
                    <div className="card-contacts">
                      {loc.supervisors.map((s, i) => (
                        <div className="contact-row" key={i}>
                          <div className="contact-info">
                            <div className="c-name">{s.name}</div>
                            <div className="c-role">{s.description}</div>
                          </div>
                          <div className="contact-actions">
                            <a href={`tel:${s.phone}`} className="contact-btn call">
                              <i className="fa-solid fa-phone"></i>
                            </a>
                            <a
                              href={`https://wa.me/${s.whatsapp?.replace(/\D/g, "")}`}
                              className="contact-btn whatsapp"
                              target="_blank"
                            >
                              <i className="fa-brands fa-whatsapp"></i>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!detailsLoading && loc.link && (
                    <div className="card-footer">
                      <a href={loc.link} className="btn visit">
                        {t("locations.visitSite")}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
