import React, { useState } from "react";

const Dispute = () => {
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь могла бы быть логика отправки жалобы на сервер
    setSubmitted(true);
  };

  return (
    <div>
      <h2>Открыть спор</h2>
      {submitted ? (
        <p>Ваша жалоба отправлена на рассмотрение.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Опишите причину спора"
            required
          />
          <br />
          <button type="submit">Отправить</button>
        </form>
      )}
    </div>
  );
};

export default Dispute;
