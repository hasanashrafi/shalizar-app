"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate, formatToman } from "@/lib/format";
import type { Order } from "@/types";

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const local = JSON.parse(
      localStorage.getItem("shalizar-orders") || "[]",
    ) as Order[];
    setOrders(local);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center">
        <p>هنوز سفارشی ثبت نشده است.</p>
        <Link href="/products" className="mt-4 inline-block text-[#c45c26]">
          شروع خرید
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.id}`}
          className="block rounded-3xl bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-bold">سفارش {order.id}</p>
              <p className="text-sm text-[#7a6a55]">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="text-left">
              <p className="font-bold text-[#c45c26]">
                {formatToman(order.total)} تومان
              </p>
              <p className="text-xs text-[#5c6b3a]">{order.status}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
