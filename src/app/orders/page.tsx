import { OrdersList } from "@/components/OrdersList";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">سفارش‌های من</h1>
      <OrdersList />
    </div>
  );
}
