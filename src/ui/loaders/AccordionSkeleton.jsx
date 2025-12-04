export default function AccordionSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="accordion-item skeleton">
          <div className="accordion-header">
            <div className="accordion-title skeleton-line"></div>
            <div className="accordion-icon skeleton-line"></div>
          </div>
          <div className="accordion-body">
            <div className="accordion-content skeleton-line"></div>
          </div>
        </div>
      ))}
    </>
  );
}
