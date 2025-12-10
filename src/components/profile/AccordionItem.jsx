import { useState } from "react";
import QuesSelect from "../../ui/forms/QuesSelect";
import SubmitButton from "../../ui/forms/SubmitButton";
import useSurvey from "../../hooks/profile/useSurvey";

export default function AccordionItem({ title, survies }) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState(
    Object.fromEntries(survies.map(q => [q.id, ""]))
  );

  const { sendSurvey, isLoading } = useSurvey();

  const handleChange = (e, id) => {
    setAnswers({ ...answers, [id]: e.target.value });
  };

  const handleSubmit = () => {
    const formattedAnswers = survies.map((q) => {
      let val = answers[q.id] || q.answer || "";
      if (val === "true" || val === true) val = 1;
      else val = 0;

      return {
        survy_id: q.id,
        answer: val,
      };
    });

    sendSurvey(formattedAnswers);
  };

  return (
    <div className="accordion_item">
      <div className="accordion_header" onClick={() => setOpen(!open)}>
        <h4>{title}</h4>
        <span>{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="accordion_body form_ui">
          {survies.map((q) => (
            <QuesSelect
              key={q.id}
              question={q.question}
              name={q.id}
              value={answers[q.id]}
              onChange={(e) => handleChange(e, q.id)}
            />
          ))}
          <SubmitButton
            text="إرسال الإجابات"
            loading={isLoading}  
            event={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}
