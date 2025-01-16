import './gallery.css'
import FsLightbox from 'fslightbox-react';
import { useState } from "react";
import { parseReportageSlides } from "#/utilities/slides.js";

export default function Gallery({ gallery }) {
  const slides = parseReportageSlides(gallery);

  if (!slides || slides.length === 0) {
    return null;
  }

  const [toggle, setToggle] = useState(false);
  const [current, setCurrent] = useState(0);

  // It's not considering state, it's considering STATE CHANGE.
  // @see https://github.com/banthagroup/fslightbox-react/issues/232#issuecomment-1842269375
  const handleFullscreen = (index) => {
    setToggle(!toggle);
    setCurrent(index + 1);
  }

  return (
    <>
      <div className="gallery">
        {
          slides.map((slide, i) => {
            return (
              <button className="photo-item" key={ slide } onClick={ () => handleFullscreen(i) }>
                <img src={ slide } alt={ `Slide ${ i }` }/>
              </button>
            )
          })
        }
      </div>
      <FsLightbox toggler={ toggle } sources={ slides } slide={ current }/>
    </>

  )
}
