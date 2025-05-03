import './municipality-content.css'
import Gallery from "#/atoms/gallery/gallery.jsx";
import React from "react";

export default function MilitaryContent({ document }) {
  if (!document) {
    return;
  }

  return (
    <div className="municipality-content printable-content">
      <div className="municipality__body-wrapper millitary-bottom-line-none">
        <div className="post-content"> {/* Добавляем этот класс */}
          <div className="municipality-modal__body">
            <h2 className="post__title">{ document.title }</h2> {/* Добавляем post__title для стилей печати */}
            <div className="content millitary-bottom-line-none">
              <div dangerouslySetInnerHTML={ { __html: document.content } }></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
