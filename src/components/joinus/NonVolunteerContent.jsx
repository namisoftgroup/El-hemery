import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetNonVolunteer from "../../hooks/join/useGetNonvolunteer";
import NonVolunteerModal from "./NonVolunteerModal";

export default function NonVolunteerContent() {
  const { t } = useTranslation();
  const { data } = useGetNonVolunteer();
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <div className="tab-content">
      {data?.alert && (
        <div className="alert-box">
          <p>{data.alert}</p>
        </div>
      )}

      {data?.requirments?.length > 0 && (
        <div className="card requirments-card">
          <h4>{t("join.requirments")}</h4>
          <ul>
            {data.requirments.map(item => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn-main" onClick={() => setModalOpen(true)}>
        {t("join.volunteerBtn")}
      </button>

      <NonVolunteerModal
        show={modalOpen}
        setShow={setModalOpen}
      />
    </div>
  );
}
