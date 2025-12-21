import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneField({ label, error, setValue, defaultCountry = "sa" }) {
  const handlePhoneChange = (value, data) => {
    if (!setValue) return;

    const phoneCode = `+${data.dialCode}`;
    const phoneNumber = value.replace(data.dialCode, "");

    setValue("phone", phoneNumber, { shouldValidate: true });
    setValue("phone_code", phoneCode, { shouldValidate: true });
    setValue("country_iso", data.countryCode?.toUpperCase(), { shouldValidate: true });
  };

  return (
    <div className="form_field w-100 phone-field-wrapper">
      {label && <label className="mb-1">{label}</label>}

      <PhoneInput
        country={defaultCountry}
        enableSearch
        onChange={handlePhoneChange}
        inputClass={`form-control ${error ? "is-invalid" : ""}`}
        buttonClass="phone-dropdown-btn"
        containerClass="phone-input-container"
        dropdownStyle={{ zIndex: 9999 }}
        inputStyle={{ paddingLeft: "80px" }} // مساحة للكود + العلم
      />

      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {error}
        </Form.Control.Feedback>
      )}
    </div>
  );
}
