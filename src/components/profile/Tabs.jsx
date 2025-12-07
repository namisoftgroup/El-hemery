import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../../ui/forms/InputField";
import SubmitButton from "../../ui/forms/SubmitButton";
import SurveysAccordion from "./SurveysAccordion";
import useSupportForm from "../../hooks/useSupport";

export default function Tabs() {
  const { t } = useTranslation();
const tabs = ["complaint", "request", "suggestion", "surveys"];
const [activeTab, setActiveTab] = useState(tabs[0]);
  const complaintsForm = useSupportForm("complaint");
  const requestsForm = useSupportForm("request");
  const suggestionsForm = useSupportForm("suggestion");

  const renderForm = (form, type) => (
    <div className="tab-box form_ui">
      <InputField
        as="textarea"
        label={t(`support.${type}Placeholder`)}       
        placeholder={t(`support.${type}Placeholder`)}
        rows={5}
        value={form.message}
        onChange={(e) => form.setMessage(e.target.value)}
      />
      <SubmitButton
        text={
          form.isLoading
            ? t("support.sending")
            : t(`support.send${type.charAt(0).toUpperCase() + type.slice(1)}`)
        }
        event={form.handleSubmit} 
      />
      {form.isSuccess && <p className="success-msg">{t("support.messageSent")}</p>}
    </div>
  );


  return (
    <div className="tabs-section">
     <div className="tabs-header">
  {tabs.map((tab) => (
    <button
      key={tab}
      className={activeTab === tab ? "active" : ""}
      onClick={() => setActiveTab(tab)}
    >
      {t(`support.${tab}`)}
    </button>
  ))}
</div>

      <div className="tabs-content">
        {activeTab === "complaint" && renderForm(complaintsForm, "complaint")}
        {activeTab === "request" && renderForm(requestsForm, "request")}
        {activeTab === "suggestion" && renderForm(suggestionsForm, "suggestion")}
        {activeTab === "surveys" && <SurveysAccordion />}
      </div>
    </div>
  );
}
