"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/data/products";
import type { ProductCategory } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "همه">("همه");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "همه" || product.category === category;
      const matchesQuery = product.name.includes(query.trim());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["همه", ...categories] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm ${
                category === item
                  ? "bg-[#2c2416] text-white"
                  : "bg-white text-[#5c5346] ring-1 ring-[#eadfce]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجوی محصول..."
          className="w-full rounded-full border border-[#eadfce] bg-white px-4 py-2 text-sm outline-none focus:border-[#c45c26] md:max-w-xs"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-[#7a6a55]">محصولی پیدا نشد.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
