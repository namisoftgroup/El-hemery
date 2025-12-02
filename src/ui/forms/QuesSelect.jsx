export default function QuesSelect({ question, name, value, onChange }) {
  return (
    <div className="yes_no_question">
      <p className="question-title">{question}</p>

      <div className="options">
        <label
          className={`option_card ${value === "yes" ? "active" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === "yes"}
            onChange={onChange}
          />
          نعم
        </label>

        <label
          className={`option_card ${value === "no" ? "active" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === "no"}
            onChange={onChange}
          />
          لا
        </label>
      </div>
    </div>
  );
}
