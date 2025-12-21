import useGetSettings from "../hooks/useSettings";
import PageHeader from "../components/PageHeader";
import { useTranslation } from "react-i18next";

export default function Jobs() {
    const { data: settings } = useGetSettings();
    const { t } = useTranslation();

    return (
        <section className="main_section ">
            <PageHeader
                title={t("jobs.Title")}
                subtitle={t("jobs.SubTitle")}
            />
            <div className="container" >
                <div
                    className="row my-3"
                    dangerouslySetInnerHTML={{ __html: settings?.jobs_tasks_text }}>
                </div>
            </div>
        </section>
    );
}
