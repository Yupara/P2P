import React from "react";

const TradeChat = ({ messages }) => (
  <div className="trade-chat">
    {messages.map((msg, idx) => (
      <div key={idx} className={`chat-msg ${msg.from}`}>
        <span>{msg.text}</span>
        <span className="chat-time">{msg.time}</span>
      </div>
    ))}
    <form>
      <input placeholder="Сообщение..." />
      <button type="submit">Отправить</button>
    </form>
  </div>
);

export default TradeChat;
