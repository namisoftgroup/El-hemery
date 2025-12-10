import AccordionItem from "./AccordionItem";
import useGetSurvey from "../../hooks/profile/useGetSurvey";

export default function SurveysAccordion() {
  const { data: surveyData, isLoading, error } = useGetSurvey();

  if (isLoading) return <p>جاري تحميل الاستبيانات...</p>;
  if (error) return <p>حدث خطأ أثناء تحميل الاستبيانات</p>;

  return (
    <div className="surveys tab-box">
      {surveyData && surveyData.length > 0 ? (
        surveyData.map((survey) => (
          <AccordionItem
            key={survey.id}
            title={survey.title}
            survies={survey.survies}
          />
        ))
      ) : (
        <p>لا توجد استبيانات متاحة</p>
      )}
    </div>
  );
}
