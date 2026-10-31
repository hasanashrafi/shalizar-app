"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "محصولات" },
  { href: "/orders", label: "سفارش‌ها" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[#eadfce]/80 bg-[#faf6ef]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5c6b3a] text-lg text-white">
            ش
          </span>
          <span>
            <span className="block font-bold text-[#2c2416]">شالیزار</span>
            <span className="block text-xs text-[#7a6a55]">حبوبات خالص</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-sm md:gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "font-semibold text-[#c45c26]"
                  : "text-[#5c5346] hover:text-[#c45c26]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          className="relative rounded-full bg-[#2c2416] px-4 py-2 text-sm text-[#faf6ef]"
        >
          سبد خرید
          {itemCount > 0 ? (
            <span className="absolute -top-2 -left-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c45c26] px-1 text-[11px]">
              {itemCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
