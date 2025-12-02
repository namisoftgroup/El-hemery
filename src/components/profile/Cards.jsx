export default function Cards({ supervisors }) {
  return (
    <div className="cards-row">
      <div className="personal-card">
        <h2 className="section-title">المعلومات الأساسية</h2>
        <ul className="personal-list">
          <li>
            <span className="label">المقعد في الباص :</span>
            <span className="val">PH23456</span>
          </li>
          <li>
            <span className="label">الاسم :</span>
            <span className="val">أحمد محمد</span>
          </li>
          <li>
            <span className="label">موقع السكن فندقي :</span>
            <span className="val">خيمة رقم 45</span>
          </li>
          <li>
            <span className="label">موقع السكن عرفات :</span>
            <span className="val">خيمة رقم 45</span>
          </li>
          <li>
            <span className="label">موقع السكن مزدلفة :</span>
            <span className="val">خيمة رقم 45</span>
          </li>
        </ul>
      </div>

      <div className="right-card">
        <div className="supervisors-card">
          <h2 className="section-title">المشرفون</h2>
          <div className="supervisors-list compact">
            {supervisors.map((s) => (
              <div className="supervisor-row" key={s.id}>
                <a href={`tel:${s.phone}`} className="call-icon">
                  <i className="fa-solid fa-phone"></i>
                </a>
                <div className="supervisor-info">
                  <div className="supervisor-name">{s.name}</div>
                  <div className="supervisor-position">{s.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="companions-card">
          <h2 className="section-title">مرتبطون معك</h2>
          <div className="companions-list compact">
            <div className="companion-item">ولاء علي السيد</div>
            <div className="companion-item">سعيد احمد</div>
          </div>
        </div>
      </div>
    </div>
  );
}
