import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import VolunteerContent from "../components/joinus/VolunteerContent";
import NonVolunteerContent from "../components/joinus/NonVolunteerContent";

export default function JoinUs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: t("join.pilgrim") },
    { id: 1, label: t("join.nonPilgrim") },
  ];

  return (
    <section className="main_section joinus">
      <PageHeader title={t("join.Title")} subtitle={t("join.SubTitle")} />

      <div className="container my-3">
        <div className="tabs-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 0 && <VolunteerContent activeTab={activeTab} />}
        {activeTab === 1 && <NonVolunteerContent />}
      </div>

    </section>
  );
}
