import React, { useState } from "react";

const CreateOrder = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь может быть логика отправки заказа на сервер
    alert(`Заказ создан: ${item}, количество: ${quantity}`);
    setItem("");
    setQuantity(1);
  };

  return (
    <div>
      <h2>Создать заказ</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={item}
          onChange={e => setItem(e.target.value)}
          placeholder="Название товара"
          required
        />
        <br />
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={e => setQuantity(Number(e.target.value))}
          placeholder="Количество"
          required
        />
        <br />
        <button type="submit">Создать заказ</button>
      </form>
    </div>
  );
};

export default CreateOrder;
