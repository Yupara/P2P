import React from "react";

const Modal = ({ isOpen, onClose, children }) =>
  isOpen ? (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal__close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  ) : null;

export default Modal;
