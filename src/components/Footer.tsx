import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#eadfce] bg-[#2c2416] text-[#f4eadb]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">شالیزار</p>
          <p className="mt-2 text-sm leading-7 text-[#d7c7b0]">
            فروش مستقیم حبوبات پاک‌شده و بسته‌بندی‌شده. سفارش آنلاین با ارسال
            به سراسر کشور.
          </p>
        </div>
        <div>
          <p className="font-semibold">دسترسی سریع</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#d7c7b0]">
            <Link href="/products">فروشگاه</Link>
            <Link href="/cart">سبد خرید</Link>
            <Link href="/checkout">ثبت سفارش</Link>
          </div>
        </div>
        <div className="text-sm leading-7 text-[#d7c7b0]">
          <p>پشتیبانی: ۰۲۱-۹۱۰۹۱۰۹۱</p>
          <p>ساعات پاسخگویی: ۹ تا ۱۸</p>
          <p>حداقل سفارش: نیم کیلو از هر محصول</p>
        </div>
      </div>
    </footer>
  );
}
