import React, { useState } from "react";

const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки объявления на сервер
    alert(`Объявление создано:\n${title}\n${description}`);
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h2>Создать объявление</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Заголовок"
          required
        />
        <br />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Описание"
          required
        />
        <br />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateAd;
