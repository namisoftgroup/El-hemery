import { Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import InputField from "../../ui/forms/InputField";
import SubmitButton from "../../ui/forms/SubmitButton";
import useVolunteerRequest from "../../hooks/join/useVolunteerRequest";

export default function VolunteerModal({ show, setShow, type }) {
    const { t } = useTranslation();

    const {
        register,
        onSubmit,
        errors,
        isLoading,
        reset,
    } = useVolunteerRequest(
        t,
        () => setShow(false),
        type
    );

    useEffect(() => {
        if (show) reset();
    }, [show, reset]);

    return (
        <Modal show={show} onHide={() => setShow(false)} centered size="md">
            <Modal.Header>
                <Modal.Title>{t("join.volunteerFormTitle")}</Modal.Title>
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
                        label={t("join.bookingNumber")}
                        {...register("booking_number")}
                        error={errors.booking_number?.message}
                    />

                    <InputField
                        label={t("join.city")}
                        {...register("city")}
                        error={errors.city?.message}
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
