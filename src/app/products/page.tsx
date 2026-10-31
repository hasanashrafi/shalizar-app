import { ProductCatalog } from "@/components/ProductCatalog";

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">فروشگاه حبوبات</h1>
      <p className="mt-2 mb-8 text-[#7a6a55]">
        محصول را انتخاب کنید، مقدار را به کیلو مشخص کنید و سفارش بدهید.
      </p>
      <ProductCatalog />
    </div>
  );
}
