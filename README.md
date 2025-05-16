<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    h2, h3 {
      color: #333;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #1a1a1a;
      padding: 10px 20px;
    }
    .logo {
      flex: 1;
    }
    nav a {
      color: #f0b90b;
      text-decoration: none;
      margin-right: 15px;
      font-weight: bold;
    }
    nav a:hover {
      color: #ffffff;
    }
    .form-container, .support-container {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
    .form-container input, .form-container select, .support-container input, .support-container textarea {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .form-container button, .support-container button {
      background-color: #f0b90b;
      color: #1a1a1a;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .form-container button:hover, .support-container button:hover {
      background-color: #d4a017;
    }
    .filter-container {
      margin-bottom: 20px;
    }
    .filter-container select {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .order-list {
      background-color: #ffffff;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .order-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .order-item:last-child {
      border-bottom: none;
    }
    .order-item select {
      padding: 5px;
      border-radius: 4px;
    }
    .order-item button {
      background-color: #ff4d4f;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .order-item button:hover {
      background-color: #d9363e;
    }
    #commissionInfo {
      margin-top: 10px;
      font-style: italic;
      color: #666;
    }
    /* Адаптивность для мобильных устройств */
    @media (max-width: 600px) {
      body {
        padding: 10px;
      }
      .form-container, .support-container {
        padding: 15px;
      }
      nav a {
        display: block;
        margin: 5px 0;
      }
      .form-container input, .form-container select, .support-container input, .support-container textarea {
        font-size: 14px;
      }
      .form-container button, .support-container button {
        width: 100%;
        padding: 12px;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">
      <h1 style="color: #f0b90b; display: inline;">P2P Exchange</h1>
    </div>
    <nav>
      <a href="#main">Главная</a>
      <a href="#support">Поддержка</a>
    </nav>
  </header>

  <!-- Главная страница -->
  <div id="main">
    <h2>P2P Обменник (Binance-style)</h2>
    <div class="form-container">
      <form id="exchangeForm">
        Валюта: <input type="text" id="currency" placeholder="USDT, BTC..." required><br>
        Сумма: <input type="number" id="amount" required><br>
        Способ: <input type="text" id="method" placeholder="QIWI, карта..." required><br>
        Тип: <select id="type">
          <option value="Покупка">Покупка</option>
          <option value="Продажа">Продажа</option>
        </select><br>
        Контакт (email): <input type="email" id="contact" placeholder="example@mail.com" required><br>
        <button onclick="addOrder(event)">Добавить заявку</button>
      </form>
    </div>

    <!-- Фильтр -->
    <div class="filter-container">
      Фильтр: 
      <select id="filterType" onchange="filterOrders()">
        <option value="Все">Все</option>
        <option value="Покупка">Покупка</option>
        <option value="Продажа">Продажа</option>
      </select>
    </div>

    <div class="order-list" id="orders">
      <h3>Активные заявки:</h3>
    </div>
    <div id="commissionInfo"></div>
  </div>

  <!-- Раздел поддержки -->
  <div id="support" class="support-container">
    <h3>Поддержка</h3>
    <form id="supportForm" onsubmit="sendSupport(event)">
      Ваше имя: <input type="text" id="supportName" required><br>
      Email: <input type="email" id="supportEmail" required><br>
      Сообщение: <textarea id="supportMessage" required></textarea><br>
      <button type="submit">Отправить</button>
    </form>
    <p id="supportResult"></p>
  </div>

  <footer>
    <p style="text-align: center; color: #666; padding: 20px 0;">© 2025 P2P Exchange. Все права защищены.</p>
  </footer>

  <script>
    let orders = [];
    const commissionRate = 0.01; // 1% комиссия
    let totalCommission = 0;

    function addOrder(event) {
      event.preventDefault();
      const currency = document.getElementById("currency").value;
      const amount = parseFloat(document.getElementById("amount").value);
      const method = document.getElementById("method").value;
      const type = document.getElementById("type").value;
      const contact = document.getElementById("contact").value;
      if (currency && amount && method && contact) {
        const order = {
          id: Date.now(),
          text: `${type}: ${amount} ${currency} через ${method} (Контакт: ${contact})`,
          status: "Ожидает",
          amount: amount,
          type: type
        };
        orders.push(order);
        updateOrders();
        document.getElementById("exchangeForm").reset();
      } else {
        alert("Заполните все поля!");
      }
    }

    function updateOrders() {
      const filterType = document.getElementById("filterType").value;
      const ordersDiv = document.getElementById("orders");
      ordersDiv.innerHTML = "<h3>Активные заявки:</h3>";
      const filteredOrders = filterType === "Все" ? orders : orders.filter(order => order.type === filterType);
      filteredOrders.forEach((order) => {
        const div = document.createElement("div");
        div.className = "order-item";
        div.innerHTML = `
          ${order.text} | Статус: 
          <select onchange="updateStatus(${order.id}, this.value)">
            <option value="Ожидает" ${order.status === "Ожидает" ? "selected" : ""}>Ожидает</option>
            <option value="В процессе" ${order.status === "В процессе" ? "selected" : ""}>В процессе</option>
            <option value="Завершена" ${order.status === "Завершена" ? "selected" : ""}>Завершена</option>
          </select>
          <button onclick="removeOrder(${order.id})">Удалить</button>
        `;
        ordersDiv.appendChild(div);
      });
      updateCommission();
    }

    function updateStatus(id, newStatus) {
      const order = orders.find(order => order.id === id);
      if (order) {
        order.status = newStatus;
        if (newStatus === "Завершена") {
          const commission = order.amount * commissionRate;
          totalCommission += commission;
        }
        updateOrders();
      }
    }

    function removeOrder(id) {
      orders = orders.filter(order => order.id !== id);
      updateOrders();
    }

    function filterOrders() {
      updateOrders();
    }

    function updateCommission() {
      document.getElementById("commissionInfo").innerText = `Общая комиссия: ${totalCommission.toFixed(2)} (1% с каждой завершенной сделки)`;
    }

    function sendSupport(event) {
      event.preventDefault();
      const name = document.getElementById("supportName").value;
      const email = document.getElementById("supportEmail").value;
      const message = document.getElementById("supportMessage").value;
      if (name && email && message) {
        const result = `Сообщение отправлено: ${name} (${email}) - ${message}. Проверьте email для ответа.`;
        document.getElementById("supportResult").innerText = result;
        document.getElementById("supportForm").reset();
      } else {
        document.getElementById("supportResult").innerText = "Заполните все поля!";
      }
    }
  </script>
</body>
</html>
