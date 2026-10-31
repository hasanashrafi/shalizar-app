"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { formatToman } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";
import { QuantityControl } from "./QuantityControl";

export function ProductDetail({ product }: { product: Product }) {
  const [quantityKg, setQuantityKg] = useState(1);

  return (
    <div className="grid gap-8 overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-2">
      <div
        className="flex min-h-72 items-center justify-center text-8xl"
        style={{ background: `${product.accent}22` }}
      >
        {product.emoji}
      </div>
      <div className="p-6 md:p-10">
        <p className="text-sm text-[#8a7b66]">{product.category}</p>
        <h1 className="mt-1 text-3xl font-bold text-[#2c2416]">{product.name}</h1>
        <p className="mt-4 leading-8 text-[#5c5346]">{product.description}</p>
        <p className="mt-3 text-sm text-[#7a6a55]">خاستگاه: {product.origin}</p>
        <p className="mt-6 text-3xl font-bold text-[#c45c26]">
          {formatToman(product.pricePerKg)}
          <span className="mr-2 text-base font-normal text-[#7a6a55]">
            تومان / کیلو
          </span>
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <QuantityControl value={quantityKg} onChange={setQuantityKg} />
          <AddToCartButton
            productId={product.id}
            quantityKg={quantityKg}
            label="افزودن به سبد"
          />
        </div>
      </div>
    </div>
  );
}
