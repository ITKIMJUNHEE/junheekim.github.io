import { useEffect } from "react";
import "./Lightbox.css";

export default function Lightbox({ src, alt, caption, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="닫기">
        ✕
      </button>
      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} />
        {caption && <figcaption className="mono">{caption}</figcaption>}
      </figure>
    </div>
  );
}
