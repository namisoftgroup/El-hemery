import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetVolunteer from "../../hooks/join/useGetvolunteer";
import VolunteerModal from "./VolunteerModal";

export default function VolunteerContent({ activeTab }) {
  const { t } = useTranslation();
  const { data } = useGetVolunteer();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="tab-content">
      {data?.duites?.length > 0 && (
        <div className="card duties-card">
          <h4>{t("join.duties")}</h4>
          <ul>{data.duites.map(item => <li key={item.id}>{item.title}</li>)}</ul>
        </div>
      )}
      {data?.benfits?.length > 0 && (
        <div className="card benefits-card">
          <h4>{t("join.benefits")}</h4>
          <ul>{data.benfits.map(item => <li key={item.id}>{item.title}</li>)}</ul>
        </div>
      )}

      <button className="btn-main" onClick={() => setModalOpen(true)}>
        {t("join.volunteerBtn")}
      </button>

      <VolunteerModal
        show={modalOpen}
        setShow={setModalOpen}
        type={activeTab === 0 ? "hajj" : "non_hajj"}
      />
    </div>
  );
}
