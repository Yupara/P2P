import React from "react";

const Wallet = ({ wallets }) => (
  <main>
    <h1>Мои кошельки</h1>
    <ul>
      {wallets.map(w => (
        <li key={w.currency}>
          {w.currency}: {w.balance}
          <button>Пополнить</button>
          <button>Вывести</button>
        </li>
      ))}
    </ul>
    <form>
      <input placeholder="Адрес или реквизиты" />
      <button type="submit">Отправить</button>
    </form>
  </main>
);

export default Wallet;
