export type ProductCategory =
  | "عدس"
  | "لوبیا"
  | "نخود"
  | "لپه"
  | "ماش"
  | "مخلوط";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  pricePerKg: number;
  unit: "کیلوگرم";
  origin: string;
  description: string;
  accent: string;
  emoji: string;
};

export type CartItem = {
  productId: string;
  quantityKg: number;
};

export type OrderCustomer = {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  quantityKg: number;
  pricePerKg: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  total: number;
  status: "ثبت‌شده";
};
