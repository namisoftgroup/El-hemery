// import { useState } from "react";
import PageHeader from "../components/PageHeader";
import InfoCard from "../components/profile/InfoCard";
import Cards from "../components/profile/Cards";
import Tabs from "../components/profile/Tabs";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
export default function Profile() {
  const { loading, profile, isAuthed } = useAuth();
  const { t } = useTranslation();

  if (loading) return <p>Loading...</p>;
  if (!isAuthed) return <p>Please login to view profile</p>;


  return (
    <main className="profile-page">
      <PageHeader title= {t("profile.Title")} subtitle= {t("profile.SubTitle")} />
      <div className="container">
        {profile && <InfoCard user={profile} />}
                {profile && <Cards user={profile} />}

          {/* <Cards supervisors={supervisors} /> */}
        <Tabs />
      </div>
    </main>
  );
}
