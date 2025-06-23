import React, { useState } from 'react';

function Exchange() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleExchange = () => {
    // Здесь будет логика обмена
    alert(`Обменять ${amount} ${from} на ${to}`);
  };

  return (
    <div>
      <h2>P2P Обменник</h2>
      <input placeholder="Отдаю (валюта)" value={from} onChange={e => setFrom(e.target.value)} />
      <input placeholder="Получаю (валюта)" value={to} onChange={e => setTo(e.target.value)} />
      <input placeholder="Сумма" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handleExchange}>Обменять</button>
    </div>
  );
}

export default Exchange;
