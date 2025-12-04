import PageHeader from "../components/PageHeader";
import InfoCard from "../components/profile/InfoCard";
import Cards from "../components/profile/Cards";
import Tabs from "../components/profile/Tabs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  const { client } = useSelector((state) => state.clientData);

  return (
    <main className="profile-page">
      <PageHeader 
        title={t("profile.Title")} 
        subtitle={t("profile.SubTitle")} 
      />
      <div className="container">
        <InfoCard user={client} />
        <Cards user={client} />
        <Tabs />
      </div>
    </main>
  );
}
