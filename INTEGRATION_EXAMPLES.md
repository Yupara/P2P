# Примеры интеграции Green P2P Exchange с внешними сервисами

## 1. Интеграция с крипто-кошельками (USDT, BTC, ETH)

### Пример (USDT на Tron через TronGrid API):

```typescript
import TronWeb from 'tronweb';

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  privateKey: process.env.TRON_PRIVATE_KEY,
});

export async function getUsdtBalance(address: string) {
  // USDT TRC20 contract
  const contract = await tronWeb.contract().at('TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj');
  const balance = await contract.balanceOf(address).call();
  return tronWeb.fromSun(balance);
}
```

### Пример (BTC через Blockcypher):

```typescript
import axios from 'axios';

export async function getBtcBalance(address: string) {
  const res = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);
  return res.data.final_balance / 1e8;
}
```

## 2. Интеграция с платежными шлюзами (Stripe)

```typescript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export async function createStripeSession(amount: number, currency: string, successUrl: string, cancelUrl: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency,
        product_data: { name: 'Deposit' },
        unit_amount: Math.round(amount * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
  return session.url;
}
```

## 3. Интеграция с Telegram Bot API

```typescript
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });

export async function sendTelegramAlert(chatId: string, text: string) {
  await bot.sendMessage(chatId, text);
}
```

## 4. Email-уведомления (SendGrid)

```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendMail(to: string, subject: string, text: string) {
  await sgMail.send({
    to,
    from: 'noreply@greenp2p.com',
    subject,
    text,
  });
}
```

## 5. Вебхуки (пример endpoint в backend)

```typescript
@Post('webhook/stripe')
@RawBody() // middleware для доступа к сырым данным
async handleStripeWebhook(@Req() req: Request) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    throw new BadRequestException('Webhook signature error');
  }
  if (event.type === 'checkout.session.completed') {
    // обработать депозит
  }
  return { received: true };
}
```

---

## Как добавить свою интеграцию

1. Создайте сервис `<ServiceName>Service` в модуле `modules/<service>/`
2. Добавьте методы для обращения к API
3. Добавьте нужные ключи API в `.env`
4. Протестируйте в sandbox-режиме

---

## Вопросы

По любым новым платёжкам, крипто-активам, интеграции с внешними сервисами — пишите в поддержку или создайте issue в репозитории!
