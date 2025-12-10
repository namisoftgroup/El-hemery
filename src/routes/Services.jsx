import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import useGetGuides from "../hooks/services/useGetGuides.js";
import useGetFaqs from "../hooks/services/useGetFaqs.js";
import useGetByCar from "../hooks/services/useGetBycar.js";
import useGetWalk from "../hooks/services/useGetWalk.js";
import useGetSupervisors from "../hooks/services/useGetCoordinate.js";

import AccordionList from "../components/services/AccordionList";
import TabsNavigation from "../components/services/TabsNavigation";
import useGetCommonFatwa from "../hooks/services/useGetCommonFatwa.js";

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const { data: guides, isLoading: loadingGuides } = useGetGuides();
  const { data: Faqs, isLoading: loadingFaqs } = useGetFaqs();
  const { data: comingByCars, isLoading: loadingCars } = useGetByCar();
  const { data: walkReturn, isLoading: loadingWalk } = useGetWalk();
  const { data: data, isLoading: loadingSupervisors } = useGetSupervisors();
  const { data: commonFatwa, isLoading: loadingCommonFatwa } = useGetCommonFatwa();

  const { t } = useTranslation();

  const tabs = [
    { id: 0, label: t("faqs.guides"), icon: "fa-book", content: guides?.map(g => ({ id: g.id, title: g.title, answer: g.description })) ?? [], loading: loadingGuides },
    { id: 1, label: t("faqs.mostCommon"), icon: "fa-comments", content: Faqs?.map(f => ({ id: f.id, title: f.question, answer: f.answer })) ?? [], loading: loadingFaqs },
    { id: 2, label: t("faqs.carTravelers"), icon: "fa-car", content: comingByCars?.map(c => ({ id: c.id, title: c.title, answer: c.description })) ?? [], loading: loadingCars },
    { id: 3, label: t("faqs.routePlan"), icon: "fa-route", content: walkReturn?.map(w => ({ id: w.id, title: w.title, answer: w.description })) ?? [], loading: loadingWalk },
    {
      id: 4,
      label: t("faqs.commonfatwa"),
      icon: "fa-hands-praying",
      content: commonFatwa?.map(f => ({ id: f.id, title: f.title, answer: f.description })) ?? [],
      loading: loadingCommonFatwa
    },
    {
      id: 5,
      label: t("faqs.coordinates"),
      icon: "fa-users-gear",
      content: data ?? [],
      loading: loadingSupervisors,
      type: "supervisors"
    },
    {
      id: 6,
      label: t("faqs.groups"),
      icon: "fa-location-dot",
      // content: data ?? [],  
      // loading: loadingSupervisors,
      // type: "supervisors"       
    },
  ];

  const currentTab = tabs[activeTab];

  return (
    <section className="faq-page">
      <PageHeader title={t("faqs.Title")} subtitle={t("faqs.SubTitle")} />

      <div className="container mb-5">
        <div className="faq-wrapper">
          <TabsNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} setActiveAccordion={setActiveAccordion} />

          <div className="tab-content-wrapper">
            <div className="tab-content-header">
              <div className="header-icon">
                <i className={`fa-solid ${currentTab.icon}`}></i>
              </div>
              <h2>{currentTab.label}</h2>
            </div>

            {/* Coordinates List */}
            {currentTab.type === "supervisors" && data?.coordinates?.length > 0 && (
              <div className="coordinates-list">
                <ul>
                  {data?.coordinates.map(coord => (
                    <li key={coord.id}>{coord.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Supervisors Grid */}
            {currentTab.type === "supervisors" ? (
              <div className="supervisors-grid">
                {data?.supervisors?.map((sup) => (
                  <div key={sup.id} className="supervisor-card">
                    <h3>{sup.name}</h3>
                    {sup.description && <p>{sup.description}</p>}
                    <div className="icons">
                      {sup.phone && <a href={`tel:${sup.phone}`} className="call"><i className="fa-solid fa-phone" /></a>}
                      {sup.whatsapp && <a href={`https://wa.me/${sup.whatsapp}`} target="_blank" rel="noreferrer" className="whatsapp"><i className="fa-brands fa-whatsapp" /></a>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="accordion">
                <AccordionList
                  items={currentTab.content}
                  activeAccordion={activeAccordion}
                  toggleAccordion={id => setActiveAccordion(activeAccordion === id ? null : id)}
                  loading={currentTab.loading}
                />
              </div>
            )}
          </div>


          <div className="faq-cta">
            <div className="cta-content">
              <h3>{t("faqs.ctaTitle")}</h3>
              <p>{t("faqs.ctaSubtitle")}</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary">
                  <i className="fa-solid fa-phone"></i> {t("faqs.callUs")}
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  <i className="fa-solid fa-envelope"></i> {t("faqs.sendMessage")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
