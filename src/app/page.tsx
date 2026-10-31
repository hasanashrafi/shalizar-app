import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  const featured = products.slice(0, 6);

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#5c6b3a,#2c2416)] px-6 py-14 text-white md:px-12">
        <p className="text-sm text-[#eadfce]">فروشگاه حبوبات شالیزار</p>
        <h1 className="mt-3 max-w-xl text-4xl font-bold leading-14 md:text-5xl">
          حبوبات پاک‌شده، تازه و آماده سفارش
        </h1>
        <p className="mt-4 max-w-lg text-lg leading-8 text-[#f4eadb]">
          عدس، لوبیا، نخود، لپه و مخلوط آش را به کیلو انتخاب کنید و سفارش را
          آنلاین ثبت کنید.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-full bg-[#c45c26] px-6 py-3 font-medium"
          >
            خرید از فروشگاه
          </Link>
          <Link
            href="/checkout"
            className="rounded-full bg-white/10 px-6 py-3"
          >
            ثبت سفارش
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["ارسال به سراسر کشور", "پس از تأیید سفارش، بسته‌بندی و ارسال می‌شود."],
          ["وزن دلخواه", "از نیم کیلو تا ۲۰ کیلو برای هر محصول."],
          ["کیفیت سورت‌شده", "دانه‌های یکدست، تمیز و بدون شن."],
        ].map(([title, text]) => (
          <article
            key={title}
            className="rounded-3xl bg-white p-5 shadow-sm"
          >
            <h2 className="font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-[#6f6454]">{text}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">پرفروش‌ها</h2>
          <Link href="/products" className="text-sm text-[#c45c26]">
            همه محصولات
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
