import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();

  return (
    <div>
      <Link href="/products" className="mb-6 inline-block text-sm text-[#7a6a55]">
        بازگشت به فروشگاه
      </Link>
      <ProductDetail product={product} />
    </div>
  );
}
