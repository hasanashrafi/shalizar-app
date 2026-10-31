"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDate, formatKg, formatToman } from "@/lib/format";
import type { Order } from "@/types";

export function OrderReceipt({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const local = JSON.parse(
      localStorage.getItem("shalizar-orders") || "[]",
    ) as Order[];
    setOrder(local.find((item) => item.id === orderId) ?? null);
    setLoaded(true);
  }, [orderId]);

  if (!loaded) {
    return <p className="text-[#7a6a55]">در حال بارگذاری رسید...</p>;
  }

  if (!order) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center">
        <p>این سفارش در این مرورگر پیدا نشد.</p>
        <Link href="/orders" className="mt-4 inline-block text-[#c45c26]">
          بازگشت به سفارش‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
      <p className="text-sm text-[#5c6b3a]">{order.status}</p>
      <h1 className="mt-1 text-2xl font-bold">سفارش با موفقیت ثبت شد</h1>
      <p className="mt-2 text-[#7a6a55]">
        شماره پیگیری {order.id} — {formatDate(order.createdAt)}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="font-bold">گیرنده</h2>
          <p className="mt-2 leading-7 text-sm text-[#5c5346]">
            {order.customer.name}
            <br />
            {order.customer.phone}
            <br />
            {order.customer.city}، {order.customer.address}
            {order.customer.notes ? (
              <>
                <br />
                توضیح: {order.customer.notes}
              </>
            ) : null}
          </p>
        </section>
        <section>
          <h2 className="font-bold">اقلام</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={item.productId} className="flex justify-between">
                <span>
                  {item.name} — {formatKg(item.quantityKg)}
                </span>
                <span>
                  {formatToman(item.pricePerKg * item.quantityKg)} تومان
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">
            مبلغ کل: {formatToman(order.total)} تومان
          </p>
        </section>
      </div>
    </div>
  );
}
