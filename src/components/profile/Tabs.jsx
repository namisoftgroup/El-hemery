import { useState } from "react";
import InputField from "../../ui/forms/InputField";
import SubmitButton from "../../ui/forms/SubmitButton";
import SurveysAccordion from "./SurveysAccordion";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("complaints");

  return (
    <div className="tabs-section">
      <div className="tabs-header">
        <button
          className={activeTab === "complaints" ? "active" : ""}
          onClick={() => setActiveTab("complaints")}
        >
          الشكاوى
        </button>
        <button
          className={activeTab === "requests" ? "active" : ""}
          onClick={() => setActiveTab("requests")}
        >
          الطلبات
        </button>
        <button
          className={activeTab === "suggestions" ? "active" : ""}
          onClick={() => setActiveTab("suggestions")}
        >
          الاقتراحات
        </button>
        <button
          className={activeTab === "surveys" ? "active" : ""}
          onClick={() => setActiveTab("surveys")}
        >
          الاستبيانات
        </button>
      </div>

      <div className="tabs-content">
        {activeTab === "complaints" && (
          <div className="tab-box form_ui">
            <InputField
              as="textarea"
              label="اكتب الشكوى هنا"
              placeholder="اكتب هنا..."
              rows={5}
            />
            <SubmitButton text="إرسال الشكوى" />
          </div>
        )}

        {activeTab === "requests" && (
          <div className="tab-box form_ui">
            <InputField
              as="textarea"
              label="اكتب طلبك هنا"
              placeholder="اكتب هنا..."
              rows={5}
            />
            <SubmitButton text="إرسال الطلب" />
          </div>
        )}

        {activeTab === "suggestions" && (
          <div className="tab-box form_ui">
            <InputField
              as="textarea"
              label="اكتب اقتراحك هنا"
              placeholder="اكتب هنا..."
              rows={5}
            />
            <SubmitButton text="إرسال الاقتراح" />
          </div>
        )}

        {activeTab === "surveys" && <SurveysAccordion />}
      </div>
    </div>
  );
}
