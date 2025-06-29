import React, { useState } from "react";

const Trade = () => {
  const [offer, setOffer] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь может быть логика обмена или отправки предложения на сервер
    setResponse(`Ваше предложение "${offer}" отправлено на рассмотрение.`);
    setOffer("");
  };

  return (
    <div>
      <h2>Обмен</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={offer}
          onChange={e => setOffer(e.target.value)}
          placeholder="Введите ваше предложение"
          required
        />
        <button type="submit">Отправить</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default Trade;
