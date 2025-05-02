import React, { useEffect, useRef, useState } from "react";
import "./modal.css";
import PrintIcon from "#/atoms/icons/print.jsx";
import TimesIcon from "#/atoms/icons/times.jsx";
import Breadcrumbs from "#/atoms/breadcrumbs/breadcrumbs.jsx";
import useClickOutside from "#/hooks/useClickOutside.js";

export default function Modal({ children, breadcrumbs, handleClose, isOpen }) {
  const modal = useRef();
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isOpen]);

  useClickOutside(modal, () => {
    if (open) handleClose();
  });

  const handlePrint = () => {
    const postContent = document.querySelector('.post-content');
    if (!postContent) return;

    // Создаем iframe для изолированной печати
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document || iframe.contentDocument;

    if (iframeDoc) {
      // Копируем стили
      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
      styles.forEach(style => {
        iframeDoc.head.appendChild(style.cloneNode(true));
      });

      // Добавляем специальные стили для печати
      const printStyle = document.createElement('style');
      printStyle.innerHTML = `
      @page {
        size: auto;
        margin: 15mm;
      }
      body {
        margin: 0;
        padding: 20px;
        font-family: Arial, sans-serif;
        font-size: 12pt;
      }
      .post-content {
        width: 100%;
        max-width: 100%;
      }
      .post-content img {
        max-width: 100% !important;
        height: auto !important;
      }
      .tags__wrapper, .related, .modal__header {
        display: none !important;
      }
      .post__title {
        font-size: 18pt;
        margin-top: 0;
      }
    `;
      iframeDoc.head.appendChild(printStyle);

      // Клонируем контент
      const contentClone = postContent.cloneNode(true);
      iframeDoc.body.appendChild(contentClone);

      // Запускаем печать после загрузки контента
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }, 500);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'modal--opened' : 'modal--closed'}`} ref={modal}>
      <div className="modal__header">
        {breadcrumbs?.length ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : <div></div>}
        <div className="actions">
          <button onClick={handlePrint}>
            <PrintIcon color="neutral-darkest" />
          </button>
          <button onClick={handleClose}>
            <TimesIcon color="neutral-darkest" />
          </button>
        </div>
      </div>
      <div className="modal__content-wrapper">{children}</div>
    </div>
  );
}
