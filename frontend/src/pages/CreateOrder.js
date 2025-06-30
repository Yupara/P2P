import React from "react";

const CreateOrder = () => (
  <main>
    <h1>Создать ордер</h1>
    <form>
      <select name="type"><option>Buy</option><option>Sell</option></select>
      <input name="crypto" placeholder="Криптовалюта (например, USDT)" />
      <input name="fiat" placeholder="Фиат (например, RUB)" />
      <input name="price" placeholder="Цена" />
      <input name="min" placeholder="Мин. сумма" />
      <input name="max" placeholder="Макс. сумма" />
      <input name="payment" placeholder="Способ оплаты" />
      <input name="terms" placeholder="Доп. условия" />
      <button type="submit">Опубликовать</button>
    </form>
  </main>
);

export default CreateOrder;
