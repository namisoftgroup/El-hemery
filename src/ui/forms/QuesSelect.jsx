export default function QuesSelect({ question, name, value, onChange }) {
  return (
    <div className="yes_no_question">
      <p className="question-title">{question}</p>

      <div className="options">
        <label
          className={`option_card ${value === "true" ? "active" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value="true"
            checked={value === "true"}
            onChange={onChange}
          />
          نعم
        </label>

        <label
          className={`option_card ${value === "false" ? "active" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value="false"
            checked={value === "false"}
            onChange={onChange}
          />
          لا
        </label>
      </div>
    </div>
  );
}
