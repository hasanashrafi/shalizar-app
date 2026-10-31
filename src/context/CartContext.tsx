"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products } from "@/data/products";
import type { CartItem, Product } from "@/types";

const STORAGE_KEY = "shalizar-cart";

type CartLine = {
  product: Product;
  quantityKg: number;
  lineTotal: number;
};

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  itemCount: number;
  totalKg: number;
  total: number;
  addItem: (productId: string, quantityKg?: number) => void;
  setQuantity: (productId: string, quantityKg: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function clampKg(value: number) {
  const rounded = Math.round(value * 2) / 2;
  return Math.min(20, Math.max(0.5, rounded));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      setItems([]);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((productId: string, quantityKg = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantityKg: clampKg(item.quantityKg + quantityKg) }
            : item,
        );
      }
      return [...current, { productId, quantityKg: clampKg(quantityKg) }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantityKg: number) => {
    if (quantityKg < 0.5) {
      setItems((current) =>
        current.filter((item) => item.productId !== productId),
      );
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantityKg: clampKg(quantityKg) }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const lines = items.flatMap((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) return [];
      return [
        {
          product,
          quantityKg: item.quantityKg,
          lineTotal: product.pricePerKg * item.quantityKg,
        },
      ];
    });

    return {
      items,
      lines,
      itemCount: lines.length,
      totalKg: lines.reduce((sum, line) => sum + line.quantityKg, 0),
      total: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      addItem,
      setQuantity,
      removeItem,
      clear,
    };
  }, [items, addItem, setQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
