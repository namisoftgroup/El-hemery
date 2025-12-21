import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useTranslation } from "react-i18next";

export default function GroupsTab({ groups }) {
  const { t } = useTranslation();

  const [activeGroupId, setActiveGroupId] = useState(null);
  const [groupDetailsMap, setGroupDetailsMap] = useState({});
  const [loadingGroupId, setLoadingGroupId] = useState(null);

  const fetchGroupDetails = async (id) => {
    try {
      setLoadingGroupId(id);
      const res = await axiosInstance.get(`/groups/${id}`);
      setGroupDetailsMap((prev) => ({
        ...prev,
        [id]: res.data.data,
      }));
    } finally {
      setLoadingGroupId(null);
    }
  };

  return (
    <div className="accordion">
      {groups?.map((group) => {
        const details = groupDetailsMap[group.id];
        const isOpen = activeGroupId === group.id;
        const isLoading = loadingGroupId === group.id;

        return (
          <div
            key={group.id}
            className={`accordion-item ${isOpen ? "active" : ""}`}
          >
            <button
              className="accordion-header"
              onClick={() => {
                if (isOpen) {
                  setActiveGroupId(null);
                } else {
                  setActiveGroupId(group.id);
                  if (!groupDetailsMap[group.id]) {
                    fetchGroupDetails(group.id);
                  }
                }
              }}
            >
              <h3 className="accordion-title">{group.title}</h3>
              <span className="accordion-icon">
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </button>

            {isOpen && (
              <div className="accordion-body">
                {isLoading ? (
                  <p>{t("group.loading")}</p>
                ) : (
                  <div className="accordion-content">
                    <div className="group-details">
                      <div className="details-row">
                        <strong>{t("group.address")}</strong>
                        <span>{details?.address}</span>
                      </div>

                      <div className="details-row">
                        <strong>{t("group.time")}</strong>
                        <span>{details?.time}</span>
                      </div>

                      {details?.supervisors?.length > 0 && (
                        <div className="group-supervisors">
                          <h4>{t("group.supervisors")}</h4>
                          {details.supervisors.map((sup) => (
                            <div key={sup.id} className="supervisor-card">
                              <div className="sup-info">
                                <p className="sup-name">{sup.name}</p>
                                {sup.description && (
                                  <span className="sup-desc">{sup.description}</span>
                                )}
                              </div>
                              <div className="icons">
                                {sup.phone && (
                                  <a href={`tel:${sup.phone}`} className="call">
                                    <i className="fa-solid fa-phone" />
                                  </a>
                                )}
                                {sup.whatsapp && (
                                  <a
                                    href={`https://wa.me/${sup.whatsapp}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="whatsapp"
                                  >
                                    <i className="fa-brands fa-whatsapp" />
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {details?.latitude && details?.longitude && (
                        <div className="location-actions">
                          <button
                            type="button"
                            className="btn-location outline"
                            onClick={() => {
                              const url = `https://www.google.com/maps?q=${details.latitude},${details.longitude}`;
                              if (navigator.share) {
                                navigator.share({ title: details.title, url });
                              } else {
                                navigator.clipboard.writeText(url);
                                alert(t("group.locationCopied"));
                              }
                            }}
                          >
                            <i className="fa-solid fa-share-nodes"></i>
                            {t("group.shareLocation")}
                          </button>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${details.latitude},${details.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-location"
                          >
                            <i className="fa-solid fa-location-arrow"></i>
                            {t("group.goToLocation")}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
