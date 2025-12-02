import { useState } from "react";
import PageHeader from "../components/PageHeader";
import InfoCard from "../components/profile/InfoCard";
import Cards from "../components/profile/Cards";
import Tabs from "../components/profile/Tabs";

export default function Profile() {
  const [userData] = useState({
    name: "أحمد محمد",
    phone: "+966 50 123 4567",
    registrationNumber: "PH23456",
    age: 45,
    gender: "ذكر",
    residenceAddress: "الرياض، المملكة العربية السعودية",
    iqamaNumber: "1234567890",
    image: "/images/2.png",
  });

  const [supervisors] = useState([
    { id: 1, name: "أحمد محمد", position: "قائد المجموعة", phone: "+966501112222" },
    { id: 2, name: "محمود علي", position: "مدير المشرفين", phone: "+966503334444" },
    { id: 3, name: "محمد سمير", position: "منسق طلبات الحجاج", phone: "+966505556666" },
  ]);

  return (
    <main className="profile-page">
      <PageHeader title="الملف الشخصي" subtitle="معلوماتك الشخصية ورقم ملفك" />
      <div className="container">
        <InfoCard user={userData} />
        <Cards supervisors={supervisors} />
        <Tabs />
      </div>
    </main>
  );
}
