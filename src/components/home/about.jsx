export default function About() {
  const cards = [
    { icon: "fas fa-bullseye", title: "الأهداف", desc: "تقديم كافة أشكال الدعم وتلبية جميع احتياجات حجاج بيت الله الحرام وتوفير المناخ المناسب لآداء المناسك بسلامة وطمأنينة راجيين من المولى عزوجل&nbsp; التوفيق والسداد وتمام القبول" },
    { icon: "fas fa-gem", title: "القيم", desc: "الحج شعيرة مقدسة ونداء مبارك من رب العباد يجيبه المسلمون إليها من شتى بقاع الأرض إمتثالاً لقول الله تبارك و تعالى ( وأذن فى الناس بالحج يأتوك رجالاً وعلى كل ضامر يأتين من كل فج عميق )" },
    { icon: "fas fa-paper-plane", title: "الرسالة", desc: "خدمة حجاج بيت الله الحرام شرف ومقام رفيع وقربة إلى الله تبارك وتعالى تستوجب إنتقاء أفضل الكفاءات&nbsp; والخبرات وبذل أقصى الجهود لإنجاز هذه المهمة الشريفة على أكمل وجه&nbsp;" },
    { icon: "fas fa-eye", title: "الرؤية", desc: "خدمة حجاج بيت الله الحرام شرف ومقام رفيع وقربة إلى الله تبارك وتعالى تستوجب إنتقاء أفضل الكفاءات والخبرات وبذل أقصى الجهود لإنجاز هذه المهمة الشريفة على أكمل وجه" },
  ];

  return (
    <section className="about-section"  id="about"> 
      <div className="hero-cards container">
        {cards.map((card, idx) => (
          <div className="card" key={idx}>
            <div className="icon">
              <i className={card.icon}></i>
            </div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
