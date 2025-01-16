import { useEffect, useState } from "react";

export default function useModal(initialState = null) {
  const [modal, setModal] = useState(initialState);
  const [isOpen, setOpen] = useState(!!initialState);

  const set = (content) => {
    if (content) {
      setModal(content);
      setOpen(true);
    } else {
      setOpen(false);
      setTimeout(() => setModal(null), 350);
    }
  }

  return [modal, isOpen, set];
}
