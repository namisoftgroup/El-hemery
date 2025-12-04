import AccordionSkeleton from "../../ui/loaders/AccordionSkeleton";

export default function AccordionList({ items = [], activeAccordion, toggleAccordion, loading }) {
  if (loading) return <AccordionSkeleton count={5} />;

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={`accordion-item ${activeAccordion === item.id ? "active" : ""}`}
        >
          <button
            className="accordion-header"
            onClick={() => toggleAccordion(item.id)}
          >
            <h3 className="accordion-title">{item.title}</h3>
            <div className="accordion-icon">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </button>
          <div className="accordion-body">
            <div className="accordion-content">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
