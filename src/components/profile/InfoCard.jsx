export default function InfoCard({ user }) {
  return (
    <div className="top-info-card">
      <div className="logo-section">
        <div className="logo-box">
          <img src={user.image} alt={user.name} />
        </div>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <span className="label">المقعد في الباص</span>
          <span className="value">{user.registrationNumber}</span>
        </div>
        <div className="info-item">
          <span className="label">رقم الهاتف</span>
          <span className="value">{user.phone}</span>
        </div>
        <div className="info-item">
          <span className="label">رقم الإقامة</span>
          <span className="value">{user.iqamaNumber}</span>
        </div>
        <div className="info-item">
          <span className="label">رقم الملف</span>
          <span className="value">14</span>
        </div>
      </div>
    </div>
  );
}
