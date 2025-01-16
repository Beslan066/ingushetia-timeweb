import './municipality-content.css'
import Gallery from "#/atoms/gallery/gallery.jsx";
import React from "react";

export default function MilitaryContent({ document }) {
  if (!document) {
    return;
  }

  return (
    <div className="municipality-content">
      <div className="municipality__body-wrapper">

        <div className="municipality-modal__body">
          <h2 className="municipality-modal__title">{ document.title }</h2>
          <div className="content">
            <div dangerouslySetInnerHTML={ { __html: document.content } }></div>
          </div>
        </div>
      </div>
    </div>
  )
}
