import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import useGetGuides from "../hooks/faqs/useGetGuides";
import useGetFaqs from "../hooks/faqs/useGetFaqs";
import useGetByCar from "../hooks/faqs/useGetBycar";
import useGetWalk from "../hooks/faqs/useGetWalk.js";

import AccordionList from "../components/faqs/AccordionList.jsx";
import TabsNavigation from "../components/faqs/TabsNavigation.jsx";

export default function Faqs() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const { data: guides, isLoading: loadingGuides } = useGetGuides();
  const { data: Faqs, isLoading: loadingFaqs } = useGetFaqs();
  const { data: comingByCars, isLoading: loadingCars } = useGetByCar();
  const { data: walkReturn, isLoading: loadingWalk } = useGetWalk();

  const { t } = useTranslation();

  const tabs = [
    { id: 0, label: t("faqs.guides"), icon: "fa-book", content: guides?.map(g => ({ id: g.id, title: g.title, answer: g.description })) ?? [], loading: loadingGuides },
    { id: 1, label: t("faqs.mostCommon"), icon: "fa-comments", content: Faqs?.map(f => ({ id: f.id, title: f.question, answer: f.answer })) ?? [], loading: loadingFaqs },
    { id: 2, label: t("faqs.carTravelers"), icon: "fa-car", content: comingByCars?.map(c => ({ id: c.id, title: c.title, answer: c.description })) ?? [], loading: loadingCars },
    { id: 3, label: t("faqs.routePlan"), icon: "fa-route", content: walkReturn?.map(w => ({ id: w.id, title: w.title, answer: w.description })) ?? [], loading: loadingWalk }
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

            <div className="accordion">
              <AccordionList
                items={currentTab.content}
                activeAccordion={activeAccordion}
                toggleAccordion={id => setActiveAccordion(activeAccordion === id ? null : id)}
                loading={currentTab.loading}
              />
            </div>
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
