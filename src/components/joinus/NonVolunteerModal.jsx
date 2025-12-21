import { Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import InputField from "../../ui/forms/InputField";
import SubmitButton from "../../ui/forms/SubmitButton";
import useVolunteerRequest from "../../hooks/join/useVolunteerRequest";
import PhoneField from "../../ui/forms/PhoneField";

export default function NonVolunteerModal({ show, setShow }) {
    const { t } = useTranslation();

    const {
        register,
        onSubmit,
        errors,
        isLoading,
        reset,
        setValue, // 👈 مهم

    } = useVolunteerRequest(
        t,
        () => setShow(false),
        "non_hajj"
    );

    useEffect(() => {
        if (!show) reset();
    }, [show, reset]);

    return (
        <Modal show={show} onHide={() => setShow(false)} centered size="md">
            <Modal.Header>
                <Modal.Title>{t("join.nonVolunteerFormTitle")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={onSubmit} className="form_ui">

                    <InputField
                        label={t("join.name")}
                        {...register("name")}
                        error={errors.name?.message}
                    />

                    <InputField
                        label={t("join.age")}
                        type="number"
                        {...register("age")}
                        error={errors.age?.message}
                    />

                    <InputField
                        label={t("join.nationality")}
                        {...register("nationality")}
                        error={errors.nationality?.message}
                    />

                    {/* <div className="row">
                        <div className="col-4">
                            <InputField
                                label={t("join.phoneCode")}
                                {...register("phone_code")}
                                error={errors.phone_code?.message}
                            />
                        </div>

                        <div className="col-8">
                            <InputField
                                label={t("join.phone")}
                                {...register("phone")}
                                error={errors.phone?.message}
                            />
                        </div>
                    </div> */}
                    <PhoneField
                        label={t("join.phone")}
                        setValue={setValue}
                        error={errors.phone?.message}
                    />

                    <InputField
                        label={t("join.experience")}
                        as="textarea"
                        rows={3}
                        {...register("experience")}
                        error={errors.experience?.message}
                    />

                    <SubmitButton
                        text={t("join.volunteerBtn")}
                        className="mt-3"
                        loading={isLoading}
                    />
                </Form>
            </Modal.Body>
        </Modal>
    );
}
