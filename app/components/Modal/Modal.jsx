import { useEffect } from "react";
export default function Modal({ text, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <></>
  );
}
