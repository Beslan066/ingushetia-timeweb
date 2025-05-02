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
    // Находим элемент с контентом поста
    const postContent = document.querySelector('.post-content');
    if (!postContent) return;

    // Сохраняем текущие стили body
    const originalBodyStyle = document.body.style.cssText;

    // Создаем временный контейнер для печати
    const printContainer = document.createElement('div');
    printContainer.id = 'print-container';

    // Клонируем содержимое поста
    const printContent = postContent.cloneNode(true);
    printContainer.appendChild(printContent);
    document.body.appendChild(printContainer);

    // Временные стили для печати
    document.body.style.cssText = `
    visibility: hidden;
    height: auto;
    overflow: visible;
  `;

    // Стили для печатного содержимого
    printContainer.style.cssText = `
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 20px;
    background: white;
  `;

    // Добавляем медиа-запрос для печати прямо в элемент
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
    @media print {
      body * {
        visibility: hidden;
      }
      #print-container,
      #print-container * {
        visibility: visible;
      }
      #print-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        padding: 0;
      }
      .tags__wrapper, .related, .post-meta__category a {
        display: none;
      }
    }
  `;
    printContainer.appendChild(printStyles);

    // Печатаем
    window.print();

    // Удаляем временные элементы и восстанавливаем стили
    document.body.removeChild(printContainer);
    document.body.style.cssText = originalBodyStyle;
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
