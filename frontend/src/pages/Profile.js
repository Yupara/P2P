import React from "react";

const Profile = () => {
  // Пример статичных данных пользователя
  const user = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    joined: "2024-01-15"
  };

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Дата регистрации:</strong> {user.joined}</p>
    </div>
  );
};

export default Profile;
