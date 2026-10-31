"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatToman, isValidIranPhone } from "@/lib/format";
import type { Order } from "@/types";

const LOCAL_ORDERS_KEY = "shalizar-orders";

export function CheckoutForm() {
  const router = useRouter();
  const { lines, total, clear } = useCart();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  if (lines.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center">
        <p>برای ثبت سفارش ابتدا محصول به سبد اضافه کنید.</p>
        <Link href="/products" className="mt-4 inline-block text-[#c45c26]">
          رفتن به فروشگاه
        </Link>
      </div>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.city.trim() || !form.address.trim()) {
      setError("نام، شهر و آدرس را کامل کنید.");
      return;
    }
    if (!isValidIranPhone(form.phone)) {
      setError("شماره موبایل را به صورت ۰۹۱۲۱۲۳۴۵۶۷ وارد کنید.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name.trim(),
            phone: form.phone.trim(),
            city: form.city.trim(),
            address: form.address.trim(),
            notes: form.notes.trim(),
          },
          items: lines.map((line) => ({
            productId: line.product.id,
            name: line.product.name,
            quantityKg: line.quantityKg,
            pricePerKg: line.product.pricePerKg,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("ثبت سفارش ناموفق بود.");
      }

      const order = (await response.json()) as Order;
      const previous = JSON.parse(
        localStorage.getItem(LOCAL_ORDERS_KEY) || "[]",
      ) as Order[];
      localStorage.setItem(
        LOCAL_ORDERS_KEY,
        JSON.stringify([order, ...previous]),
      );
      clear();
      router.push(`/orders/${order.id}`);
    } catch {
      setError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 lg:grid-cols-[1fr_320px]"
    >
      <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold">اطلاعات گیرنده</h2>
        <label className="block text-sm">
          نام و نام خانوادگی
          <input
            required
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            className="mt-1 w-full rounded-2xl border border-[#eadfce] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          موبایل
          <input
            required
            inputMode="numeric"
            value={form.phone}
            onChange={(event) =>
              setForm((current) => ({ ...current, phone: event.target.value }))
            }
            placeholder="0912xxxxxxx"
            className="mt-1 w-full rounded-2xl border border-[#eadfce] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          شهر
          <input
            required
            value={form.city}
            onChange={(event) =>
              setForm((current) => ({ ...current, city: event.target.value }))
            }
            className="mt-1 w-full rounded-2xl border border-[#eadfce] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          آدرس کامل
          <textarea
            required
            rows={3}
            value={form.address}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                address: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-2xl border border-[#eadfce] px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          توضیحات سفارش (اختیاری)
          <textarea
            rows={2}
            value={form.notes}
            onChange={(event) =>
              setForm((current) => ({ ...current, notes: event.target.value }))
            }
            className="mt-1 w-full rounded-2xl border border-[#eadfce] px-3 py-2"
          />
        </label>
        {error ? <p className="text-sm text-[#9a3412]">{error}</p> : null}
      </div>

      <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="font-bold">اقلام سبد</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {lines.map((line) => (
            <li key={line.product.id} className="flex justify-between gap-3">
              <span>
                {line.product.name} ×{" "}
                {new Intl.NumberFormat("fa-IR", {
                  maximumFractionDigits: 1,
                }).format(line.quantityKg)}{" "}
                کیلو
              </span>
              <span>{formatToman(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between font-bold">
          <span>جمع کل</span>
          <span>{formatToman(total)} تومان</span>
        </p>
        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-[#c45c26] py-3 text-white disabled:opacity-60"
        >
          {pending ? "در حال ثبت..." : "ثبت سفارش"}
        </button>
      </aside>
    </form>
  );
}
