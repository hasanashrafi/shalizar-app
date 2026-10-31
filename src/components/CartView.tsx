"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatKg, formatToman } from "@/lib/format";
import { QuantityControl } from "./QuantityControl";

export function CartView() {
  const { lines, total, totalKg, setQuantity, removeItem } = useCart();

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-[#2c2416]">سبد خرید خالی است</p>
        <p className="mt-2 text-sm text-[#7a6a55]">
          از فروشگاه حبوبات مورد نظر را انتخاب کنید.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-full bg-[#c45c26] px-5 py-2 text-white"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {lines.map((line) => (
          <article
            key={line.product.id}
            className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
          >
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{ background: `${line.product.accent}22` }}
            >
              {line.product.emoji}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-[#2c2416]">{line.product.name}</h2>
              <p className="text-sm text-[#7a6a55]">
                {formatToman(line.product.pricePerKg)} تومان / کیلو
              </p>
            </div>
            <QuantityControl
              value={line.quantityKg}
              onChange={(next) => setQuantity(line.product.id, next)}
            />
            <div className="text-left">
              <p className="font-bold text-[#c45c26]">
                {formatToman(line.lineTotal)}
              </p>
              <button
                type="button"
                onClick={() => removeItem(line.product.id)}
                className="text-xs text-[#9a3412]"
              >
                حذف
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold">خلاصه سفارش</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>وزن کل</span>
            <span>{formatKg(totalKg)}</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>مبلغ کل</span>
            <span>{formatToman(total)} تومان</span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="mt-6 flex items-center justify-center rounded-full bg-[#5c6b3a] py-3 text-white"
        >
          ادامه و ثبت سفارش
        </Link>
      </aside>
    </div>
  );
}
