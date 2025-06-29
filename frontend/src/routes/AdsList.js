import React from "react";

const AdsList = () => {
  // Пример списка объявлений, можно заменить на данные из props или state
  const ads = [
    { id: 1, title: "Продам велосипед", description: "Почти новый, отличное состояние!" },
    { id: 2, title: "Сдам квартиру", description: "2 комнаты, центр города." },
    { id: 3, title: "Куплю ноутбук", description: "Рассмотрю любые варианты." },
  ];

  return (
    <div>
      <h2>Список объявлений</h2>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdsList;
