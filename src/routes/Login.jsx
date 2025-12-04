import { useTranslation } from "react-i18next";
import InputField from "../ui/forms/InputField";
import SubmitButton from "../ui/forms/SubmitButton";
import PageHeader from "../components/PageHeader";
import useLoginById from "../hooks/useLoginById";

export default function Login() {
  const { t } = useTranslation();
  const { register, onSubmit, errors, isLoading } = useLoginById(t);

  return (
    <section className="auth_section main_section">
      <PageHeader
        title={t("auth.loginTitle")}
        subtitle={t("auth.SubTitle")}
      />

      <div className="container">
        <div className="row">

          <div className="col-lg-6 col-12 p-2 d-flex flex-column">
            <h3 className="section_title">{t("auth.loginTitle")}</h3>
            <p className="section_description">{t("auth.loginWithIdOnly")}</p>

            <form className="form_ui mt-3" onSubmit={onSubmit}>
              <div className="form_group">
                <InputField
                  label={t("auth.idNumber")}
                  type="text"
                  placeholder={t("auth.enterIdNumber")}
                  {...register("number_id")}
                  error={errors.number_id?.message}
                />
              </div>

              <SubmitButton
                text={t("auth.signIn")}
                loading={isLoading}
                className="mt-3"
                disabled={isLoading}
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
