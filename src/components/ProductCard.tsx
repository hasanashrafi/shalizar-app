import Link from "next/link";
import type { Product } from "@/types";
import { formatToman } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-[0_10px_30px_rgba(44,36,22,0.06)]">
      <Link href={`/products/${product.id}`} className="block">
        <div
          className="flex h-40 items-center justify-center text-5xl"
          style={{ background: `${product.accent}22` }}
        >
          <span>{product.emoji}</span>
        </div>
        <div className="px-5 pt-4">
          <p className="text-xs text-[#8a7b66]">{product.category}</p>
          <h3 className="mt-1 text-lg font-bold text-[#2c2416]">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6f6454]">
            {product.description}
          </p>
        </div>
      </Link>
      <div className="mt-auto flex items-end justify-between gap-3 px-5 pb-5 pt-4">
        <div>
          <p className="text-lg font-bold text-[#c45c26]">
            {formatToman(product.pricePerKg)}
          </p>
          <p className="text-xs text-[#8a7b66]">تومان / کیلو</p>
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </article>
  );
}
