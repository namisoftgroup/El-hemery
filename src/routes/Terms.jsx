import useGetSettings from "../hooks/useSettings";
import PageHeader from "../components/PageHeader";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { data: settings } = useGetSettings();
  const { t } = useTranslation();

  return (
    <section className="main_section terms">
          <PageHeader 
               title={t("terms.Title")} 
               subtitle={t("terms.SubTitle")} 
             />
      <div className="container">
        <div className="row">
     
          <div
            className="col-12 p-2"
            dangerouslySetInnerHTML={{ __html: settings?.terms_conditions_text}}
          />
        </div>
      </div>
    </section>
  );
}
