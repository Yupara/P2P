// до
import React, { useEffect, useState } from 'react';
import { Order } from '../components/OrderCard';
...
{orders.map(order => (
  <Order key={order.id} order={order} />
))}

// после
import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
...
{orders.map(order => (
  <OrderCard key={order.id} order={order} />
))}
