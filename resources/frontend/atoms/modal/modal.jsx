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
    // Ищем основной контейнер с контентом внутри модального окна
    const contentContainer = modal.current.querySelector('.printable-content, .post-content');
    if (!contentContainer) {
      console.error('Контент для печати не найден');
      return;
    }

    // Создаем iframe для печати
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document || iframe.contentDocument;

    if (iframeDoc) {
      // Копируем основные стили
      const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
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
        visibility: visible !important;
      }
      .printable-content, .post-content {
        width: 100%;
        max-width: 100%;
        page-break-inside: avoid;
      }
      .post__title, .mountain-modal__title, .municipality-modal__title {
        font-size: 18pt;
        margin-top: 0;
        page-break-after: avoid;
      }
      img {
        max-width: 100% !important;
        height: auto !important;
        page-break-inside: avoid;
      }
      .tags__wrapper, .related, .modal__header, .share__wrapper,
      .mountain__properties, .mountain-image__description,
      .post-meta__category, .post-meta__date {
        display: none !important;
      }
    `;
      iframeDoc.head.appendChild(printStyle);

      // Клонируем контент, удаляя ненужные элементы
      const contentClone = contentContainer.cloneNode(true);

      // Удаляем элементы, которые не должны печататься
      const elementsToRemove = contentClone.querySelectorAll(
        '.tags__wrapper, .related, .share__wrapper, .mountain__properties, .post__meta'
      );
      elementsToRemove.forEach(el => el.remove());

      iframeDoc.body.appendChild(contentClone);

      // Запускаем печать
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
          <button onClick={handlePrint} className={'print-icon'}>
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
