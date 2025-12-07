import { useTranslation } from "react-i18next";
import InputField from "../ui/forms/InputField";
import PageHeader from "../components/PageHeader";
import useContact from "../hooks/useContact";

export default function Contact() {
  const { t } = useTranslation();

  const { register, handleSubmit, errors, isLoading } = useContact(t);

  const socialCards = [
    { title: t("contact.insta"), icon: "fa-instagram", color: "#E1306C", link: "#" },
    { title: t("contact.snap"), icon: "fa-snapchat", color: "#FFFC00", link: "#" },
    { title: t("contact.whats"), icon: "fa-whatsapp", color: "#25D366", link: "#" },
    { title: t("contact.tiktok"), icon: "fa-tiktok", color: "#000000", link: "#" },
  ];

  return (
    <section className="contact-page">
      <PageHeader
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
      />

      <div className="container mb-5">
        <div className="row g-4">
          {socialCards.map((card, i) => (
            <div className="col-6 col-md-3" key={i}>
              <a
                href={card.link}
                className="social-card d-flex flex-column align-items-center justify-content-center p-4 rounded-4"
              >
                <i
                  className={`fab ${card.icon} icon mb-2`}
                  style={{ color: card.color, fontSize: "32px" }}
                ></i>
                <h5 className="m-0">{card.title}</h5>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="form_section container">
        <div className="row align-items-center justify-content-between g-4">
          <div className="col-lg-6 col-12">
            <form className="contact-form form_ui" onSubmit={handleSubmit}>
              <h4 className="title mb-3">{t("contact.formTitle")}</h4>

              <InputField
                label={t("contact.fullName")}
                placeholder={t("contact.fullNamePlaceholder")}
                error={errors?.name?.message}
                {...register("name")}
              />

              <InputField
                label={t("contact.email")}
                placeholder={t("contact.emailPlaceholder")}
                type="email"
                error={errors?.email?.message}
                {...register("email")}
              />

              <InputField
                as="textarea"
                label={t("contact.message")}
                placeholder={t("contact.messagePlaceholder")}
                error={errors?.message?.message}
                {...register("message")}
              />

              <button type="submit" className="btn-send mt-3" disabled={isLoading}>
                {isLoading ? t("contact.sending") : t("contact.send")}
              </button>
            </form>
          </div>

          <div className="col-lg-5 col-12 d-lg-block d-none">
            <div className="contact-img ps-lg-4">
              <img src="/images/h1.png" alt="Contact" className="w-100 rounded-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
