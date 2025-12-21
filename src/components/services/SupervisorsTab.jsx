// import { useTranslation } from "react-i18next";

export default function SupervisorsTab({ data }) {
//   const { t } = useTranslation();

  if (!data) return null;

  return (
    <>
      {data.coordinates?.length > 0 && (
        <div className="coordinates-list">
          <ul>
            {data.coordinates.map((coord) => (
              <li key={coord.id}>{coord.title}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="supervisors-grid">
        {data.supervisors?.map((sup) => (
          <div key={sup.id} className="supervisor-card">
            <h3>{sup.name}</h3>
            {sup.description && <p>{sup.description}</p>}
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
    </>
  );
}
