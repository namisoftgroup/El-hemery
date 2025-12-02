import { useTranslation } from "react-i18next";
import InputField from "../ui/forms/InputField";
import SubmitButton from "../ui/forms/SubmitButton";

export default function Login() {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with ID Number");
  };

  return (
    <section className="auth_section main_section">
      <div className="container">
        <div className="row">

          <div className="col-lg-6 col-12 p-2 d-flex flex-column">
            <h3 className="section_title">{t("auth.loginTitle")}</h3>
            <p className="section_description">
              {t("auth.loginWithIdOnly")}
            </p>

            <form className="form_ui mt-3" onSubmit={handleSubmit}>
              <div className="form_group">
                <InputField
                  label={t("auth.idNumber")}
                  type="text"
                  placeholder={t("auth.enterIdNumber")}
                  name="idNumber"
                />
              </div>


              <SubmitButton
                text={t("auth.signIn")}
                loading={false}
                className="mt-3"
              />

            </form>
          </div>

          <div className="col-lg-5 col-12 p-2 d-lg-block d-none">
            <div className="img">
              <img src="/images/h1.png" alt="auth" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
