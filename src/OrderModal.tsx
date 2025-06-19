import React from "react";
export default function OrderModal({ order, onClose }: { order: any, onClose: () => void }) {
  if (!order) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Детали ордера #{order.id}</h3>
        <pre>{JSON.stringify(order, null, 2)}</pre>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}
