export default function DuaSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <article key={index} className="dua-card skeleton">
          <div className="dua-head">
            <div className="skeleton-line title"></div>
          </div>

          <div className="skeleton-line text"></div>
          <div className="skeleton-line text short"></div>
        </article>
      ))}
    </>
  );
}
