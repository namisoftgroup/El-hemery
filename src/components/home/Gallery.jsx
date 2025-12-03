import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const IMAGES = [
  "/images/h1.png",
    "/images/h2.png",
        "/images/2.png",

"/images/1.png",
        "/images/3.png",

];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">معرض الصور</h2>

      <div className="gallery-grid container">
        {IMAGES.map((src, index) => (
          <div
            className="gallery-item"
            key={index}
            onClick={() => {
              setCurrent(index);
              setOpen(true);
            }}
          >
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        index={current}
        close={() => setOpen(false)}
        slides={IMAGES.map((src) => ({ src }))}
      />
    </section>
  );
}
