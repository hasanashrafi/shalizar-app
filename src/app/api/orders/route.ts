import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";
import { isValidIranPhone } from "@/lib/format";
import { listOrders, saveOrder } from "@/lib/orders-store";
import type { Order, OrderCustomer, OrderItem } from "@/types";

type Payload = {
  customer?: OrderCustomer;
  items?: OrderItem[];
};

export async function GET() {
  const orders = await listOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;
  const customer = body.customer;
  const items = body.items ?? [];

  if (
    !customer?.name?.trim() ||
    !customer.city?.trim() ||
    !customer.address?.trim() ||
    !isValidIranPhone(customer.phone ?? "")
  ) {
    return NextResponse.json(
      { error: "اطلاعات مشتری ناقص است." },
      { status: 400 },
    );
  }

  if (items.length === 0) {
    return NextResponse.json({ error: "سبد خالی است." }, { status: 400 });
  }

  const normalized: OrderItem[] = [];
  for (const item of items) {
    const product = getProduct(item.productId);
    if (!product) {
      return NextResponse.json(
        { error: "محصول نامعتبر است." },
        { status: 400 },
      );
    }
    const quantityKg = Math.round(Number(item.quantityKg) * 2) / 2;
    if (quantityKg < 0.5 || quantityKg > 20) {
      return NextResponse.json(
        { error: "مقدار سفارش نامعتبر است." },
        { status: 400 },
      );
    }
    normalized.push({
      productId: product.id,
      name: product.name,
      quantityKg,
      pricePerKg: product.pricePerKg,
    });
  }

  const order: Order = {
    id: `SH-${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
    customer: {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      city: customer.city.trim(),
      address: customer.address.trim(),
      notes: customer.notes?.trim() || undefined,
    },
    items: normalized,
    total: normalized.reduce(
      (sum, item) => sum + item.pricePerKg * item.quantityKg,
      0,
    ),
    status: "ثبت‌شده",
  };

  await saveOrder(order);
  return NextResponse.json(order, { status: 201 });
}
