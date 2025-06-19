import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
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

import { Controller, Get, Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  private orders = [
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
    // ... остальные ордера
  ];

  @Get()
  findAll() {
    return this.orders;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orders.find(o => o.id === Number(id));
  }
}

import { Controller, Get, Param } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  private orders = [
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
      payData: {
        bank: "Сбербанк",
        fullName: "Иванов Иван",
        card: "1234 5678 9012 3456",
        buyer: "goldyan",
        orderTime: "2024-01-23 20:25:14"
      }
    },
    // ... другие ордера
  ];

  @Get()
  findAll() {
    return this.orders;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orders.find(o => o.id === Number(id));
  }
}
