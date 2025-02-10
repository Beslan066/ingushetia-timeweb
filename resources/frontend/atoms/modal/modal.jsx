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
    setOpen(isOpen);
  }, [isOpen]);

  useClickOutside(modal, () => {
    if (open) handleClose();
  });

  return (
    <div className={`modal modal--${isOpen ? "opened" : "closed"}`} ref={modal}>
      <div className="modal__header">
        {breadcrumbs?.length ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : <div></div>}
        <div className="actions">
          <button>
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
