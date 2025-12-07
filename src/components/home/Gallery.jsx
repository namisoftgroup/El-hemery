import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useGetGallery from "../../hooks/home/useGetGallery";

export default function Gallery() {
  const { data } = useGetGallery();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Failed to load gallery</p>;

  const IMAGES = data?.map((item) => item.file) || [];

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
            <img src={src} alt={`Gallery ${index + 1}`} loading="lazy" />
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
