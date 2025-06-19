import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  findAll() {
    return [
      {
        id: 1,
        username: "Savak",
        price: "70,96",
        amount: "304,7685 USDT",
        limits: "500 – 500 000 RUB",
        payment: "SBP, кольнениe",
        orders: 40,
        percent: 10,
        status: "online",
      },
      {
        id: 2,
        username: "Ищу_Партнеров",
        price: "71,03",
        amount: "128,8821 USDT",
        limits: "500 – 500 000 RUB",
        payment: "Пиметы, Овореол",
        orders: 15,
        percent: 10,
        status: "warning",
      },
      {
        id: 3,
        username: "ПроданоМейкеро",
        price: "71,03",
        amount: "999,9999 USDT",
        limits: "500 – 500 000 RUB",
        payment: "SBP",
        orders: 11,
        percent: 10,
        status: "online",
      },
    ];
  }
}
