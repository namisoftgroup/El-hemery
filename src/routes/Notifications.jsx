import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import useGetNotifications from "../hooks/profile/useGetNotifications";
import NotificationLoader from "../ui/loaders/NotificationLoader";

export default function Notifications() {
  const { t } = useTranslation();
  const { data: notifications = [], isLoading } = useGetNotifications();

  return (
    <div className="notifications-page">
      <PageHeader
        title={t("notifications.Title")}
        subtitle={t("notifications.SubTitle")}
      />

      <div className="container">

        {isLoading && (
          <div className="row">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="col-12 p-2" key={index}>
                <NotificationLoader />
              </div>
            ))}
          </div>
        )}

        {!isLoading && notifications.map((notification) => (
          <div className="notify-card" key={notification.id}>
            
            <div className="notify-left">
              <img
                src={notification.from_user_image}
                alt={notification.from_user}
                className="notify-img"
              />

              <div className="notify-text">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
              </div>
            </div>

            <span className="notify-time">{notification.created_at}</span>

          </div>
        ))}

      </div>
    </div>
  );
}
