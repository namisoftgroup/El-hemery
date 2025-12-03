import PageHeader from "../components/PageHeader";

export default function Notifications() {
  const notifications = [
    {
      img: "/images/h1.png",
      title: "تمت الموافقة على طلبك",
      desc: "تمت مراجعة طلب الانضمام الخاص بك بنجاح.",
      time: "منذ 5 دقائق"
    },
    {
      img: "/images/fav.svg",
      title: "تم تحديث بيانات الحساب",
      desc: "قمت بتعديل البيانات الشخصية.",
      time: "منذ ساعة"
    },

  ];

  return (
    <div className="notifications-page">
  <PageHeader
        title="الإشعارات"
        subtitle="ابقَ على اطلاع بآخر التحديثات والتنبيهات"
      />
      <div className="container">
      {notifications.map((n, i) => (
        <div className="notify-card" key={i}>
          
          <div className="notify-left">
            <img src={n.img} alt="" className="notify-img" />
            <div className="notify-text">
              <h4>{n.title}</h4>
              <p>{n.desc}</p>
            </div>
          </div>

          <span className="notify-time">{n.time}</span>

        </div>
      ))}
</div>
    </div>
  );
}
