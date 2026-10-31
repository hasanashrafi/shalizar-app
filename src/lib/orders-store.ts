import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Order } from "@/types";

const dataDir = path.join(process.cwd(), "data");
const ordersFile = path.join(dataDir, "orders.json");

async function readOrders(): Promise<Order[]> {
  try {
    const raw = await readFile(ordersFile, "utf8");
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

export async function listOrders() {
  const orders = await readOrders();
  return orders.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function saveOrder(order: Order) {
  const orders = await readOrders();
  orders.push(order);
  await mkdir(dataDir, { recursive: true });
  await writeFile(ordersFile, JSON.stringify(orders, null, 2), "utf8");
  return order;
}
