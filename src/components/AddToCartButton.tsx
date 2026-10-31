"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function AddToCartButton({
  productId,
  quantityKg = 1,
  label = "افزودن",
}: {
  productId: string;
  quantityKg?: number;
  label?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(productId, quantityKg);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
      }}
      className="rounded-full bg-[#5c6b3a] px-4 py-2 text-sm text-white transition hover:bg-[#4a572f]"
    >
      {added ? "اضافه شد" : label}
    </button>
  );
}
