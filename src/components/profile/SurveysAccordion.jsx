import { useState } from "react";
import QuesSelect from "../../ui/forms/QuesSelect";
import SubmitButton from "../../ui/forms/SubmitButton";

// AccordionItem Component
function AccordionItem({ title, questions }) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState(
    Object.fromEntries(questions.map(q => [q.name, ""]))
  );

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  return (
    <div className="accordion_item">
      <div className="accordion_header" onClick={() => setOpen(!open)}>
        <h4>{title}</h4>
        <span>{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="accordion_body form_ui">
          {questions.map((q) => (
            <QuesSelect
              key={q.name}
              question={q.question}
              name={q.name}
              value={answers[q.name]}
              onChange={handleChange}
            />
          ))}
          <SubmitButton text="إرسال الإجابات" />
        </div>
      )}
    </div>
  );
}

// SurveysAccordion Component
export default function SurveysAccordion() {
  const surveyData = [
    {
      title: "استبيان عن المشرف",
      questions: [
        { name: "s1_q1", question: "هل تم توفير التدريب الشامل لجميع المرشحين؟" },
        { name: "s1_q2", question: "هل كان المشرف متعاونًا أثناء الزيارة الميدانية؟" },
        { name: "s1_q3", question: "هل تم تسليم جميع المهام في الوقت المحدد؟" },
      ],
    },
    {
      title: "استبيان عن المواصلات",
      questions: [
        { name: "t_q1", question: "هل كانت وسائل النقل مناسبة ومريحة؟" },
        { name: "t_q2", question: "هل وصلت المواصلات في الوقت المحدد؟" },
      ],
    },
  ];

  return (
    <div className="surveys tab-box">
      {surveyData.map((survey) => (
        <AccordionItem key={survey.title} title={survey.title} questions={survey.questions} />
      ))}
    </div>
  );
}
