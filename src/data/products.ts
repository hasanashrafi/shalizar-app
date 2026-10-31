import type { Product, ProductCategory } from "@/types";

export const categories: ProductCategory[] = [
  "عدس",
  "لوبیا",
  "نخود",
  "لپه",
  "ماش",
  "مخلوط",
];

export const products: Product[] = [
  {
    id: "red-lentil",
    name: "عدس قرمز",
    category: "عدس",
    pricePerKg: 89000,
    unit: "کیلوگرم",
    origin: "آذربایجان شرقی",
    description:
      "عدس قرمز پوست‌کنده، مناسب سوپ و خورشت. پخت سریع و طعم ملایم.",
    accent: "#c45c26",
    emoji: "🟠",
  },
  {
    id: "green-lentil",
    name: "عدس سبز",
    category: "عدس",
    pricePerKg: 95000,
    unit: "کیلوگرم",
    origin: "زنجان",
    description:
      "عدس سبز درشت برای عدسی، سالاد و خوراک. دانه‌ها یکدست و بدون شکستگی.",
    accent: "#5c6b3a",
    emoji: "🟢",
  },
  {
    id: "canadian-lentil",
    name: "عدس درشت کانادایی",
    category: "عدس",
    pricePerKg: 155000,
    unit: "کیلوگرم",
    origin: "وارداتی",
    description:
      "عدس درشت با رنگ کهربایی، مناسب غذاهای رسمی و خورشت‌های غلیظ.",
    accent: "#9a3412",
    emoji: "🟤",
  },
  {
    id: "pinto-bean",
    name: "لوبیا چیتی",
    category: "لوبیا",
    pricePerKg: 128000,
    unit: "کیلوگرم",
    origin: "لرستان",
    description:
      "لوبیا چیتی اعلا برای خورشت، خوراک و کنسرو خانگی. بافت نرم بعد از پخت.",
    accent: "#b45309",
    emoji: "🫘",
  },
  {
    id: "red-bean",
    name: "لوبیا قرمز",
    category: "لوبیا",
    pricePerKg: 135000,
    unit: "کیلوگرم",
    origin: "اردبیل",
    description:
      "لوبیا قرمز براق برای خوراک لوبیا، سالاد و خورشت قرمه‌سبزی.",
    accent: "#991b1b",
    emoji: "❤️",
  },
  {
    id: "white-bean",
    name: "لوبیا سفید",
    category: "لوبیا",
    pricePerKg: 142000,
    unit: "کیلوگرم",
    origin: "همدان",
    description:
      "لوبیا سفید درشت، مناسب خوراک لوبیا سفید، سوپ و پیش‌غذا.",
    accent: "#e7e5e4",
    emoji: "⚪",
  },
  {
    id: "black-eyed-pea",
    name: "لوبیا چشم‌بلبلی",
    category: "لوبیا",
    pricePerKg: 125000,
    unit: "کیلوگرم",
    origin: "خوزستان",
    description:
      "لوبیا چشم‌بلبلی معطر برای خوراک جنوبی و سالاد حبوبات.",
    accent: "#44403c",
    emoji: "🧿",
  },
  {
    id: "chickpea",
    name: "نخود اعلا",
    category: "نخود",
    pricePerKg: 118000,
    unit: "کیلوگرم",
    origin: "کرمانشاه",
    description:
      "نخود درشت برای آبگوشت، نخودچی خانگی و فلافل. پخت یکنواخت.",
    accent: "#d6b07a",
    emoji: "🟡",
  },
  {
    id: "split-pea",
    name: "لپه ممتاز",
    category: "لپه",
    pricePerKg: 105000,
    unit: "کیلوگرم",
    origin: "اصفهان",
    description:
      "لپه پوست‌کنده برای خورشت قیمه. رنگ زرد روشن و بدون تلخی.",
    accent: "#ca8a04",
    emoji: "💛",
  },
  {
    id: "mung-bean",
    name: "ماش",
    category: "ماش",
    pricePerKg: 98000,
    unit: "کیلوگرم",
    origin: "گلستان",
    description:
      "ماش سبز تازه برای آش ماش، جوانه و سوپ سبک. غنی از پروتئین.",
    accent: "#3f6212",
    emoji: "🌿",
  },
  {
    id: "fava-bean",
    name: "باقلا خشک",
    category: "مخلوط",
    pricePerKg: 110000,
    unit: "کیلوگرم",
    origin: "گیلان",
    description:
      "باقلا خشک پوست‌دار برای باقلاقاتق، آش و خوراک سنتی شمال.",
    accent: "#65a30d",
    emoji: "🫛",
  },
  {
    id: "ash-mix",
    name: "مخلوط آش رشته",
    category: "مخلوط",
    pricePerKg: 132000,
    unit: "کیلوگرم",
    origin: "ترکیب شالیزار",
    description:
      "ترکیب آماده عدس، لوبیا، نخود و لپه برای آش رشته و آش جو.",
    accent: "#7c2d12",
    emoji: "🍲",
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category?: ProductCategory) {
  if (!category) return products;
  return products.filter((product) => product.category === category);
}
