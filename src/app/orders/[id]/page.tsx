import { OrderReceipt } from "@/components/OrderReceipt";

export default async function OrderPage({
  params,
}: PageProps<"/orders/[id]">) {
  const { id } = await params;
  return <OrderReceipt orderId={id} />;
}
