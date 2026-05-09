// Local data store with localStorage persistence
import { useEffect, useState, useSyncExternalStore } from "react";

export type Category = { id: string; name: string };
export type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  categoryId: string;
  stock: number;
  image: string;
};
export type CartItem = { productId: string; qty: number };
export type Transaction = {
  id: string;
  date: string;
  customer: string;
  method: "Tunai" | "QRIS";
  items: { name: string; qty: number; price: number; unit: string }[];
  subtotal: number;
  paid: number;
  change: number;
};
export type Settings = {
  shopName: string;
  address: string;
  phone: string;
  taxPercent: number;
};

type Store = {
  categories: Category[];
  products: Product[];
  transactions: Transaction[];
  settings: Settings;
};

const FLOWER_IMGS = [
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400",
  "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400",
  "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400",
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400",
  "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400",
  "https://images.unsplash.com/photo-1457089328389-e5d2e7da5202?w=400",
];
const WRAP_IMG = "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400";

const DEFAULT: Store = {
  categories: [
    { id: "c1", name: "Bunga" },
    { id: "c2", name: "Wrapping" },
  ],
  products: [
    { id: "p1", name: "Mawar Merah", price: 15000, unit: "tangkai", categoryId: "c1", stock: 50, image: FLOWER_IMGS[0] },
    { id: "p2", name: "Mawar Pink", price: 15000, unit: "tangkai", categoryId: "c1", stock: 40, image: FLOWER_IMGS[1] },
    { id: "p3", name: "Aster Ungu", price: 15000, unit: "tangkai", categoryId: "c1", stock: 30, image: FLOWER_IMGS[2] },
    { id: "p4", name: "Daisy Pink", price: 12000, unit: "tangkai", categoryId: "c1", stock: 60, image: FLOWER_IMGS[3] },
    { id: "p5", name: "Krisan", price: 10000, unit: "tangkai", categoryId: "c1", stock: 80, image: FLOWER_IMGS[4] },
    { id: "p6", name: "Baby Breath", price: 18000, unit: "ikat", categoryId: "c1", stock: 25, image: FLOWER_IMGS[5] },
    { id: "p7", name: "Wrapping Kraft", price: 8000, unit: "lembar", categoryId: "c2", stock: 100, image: WRAP_IMG },
    { id: "p8", name: "Wrapping Korean", price: 12000, unit: "lembar", categoryId: "c2", stock: 80, image: WRAP_IMG },
  ],
  transactions: [],
  settings: {
    shopName: "Gurita Bouquet",
    address: "Jl. Bunga Mawar No. 12, Jakarta",
    phone: "0812-3456-7890",
    taxPercent: 0,
  },
};

const KEY = "gurita-store-v1";
let store: Store = load();
const listeners = new Set<() => void>();

function load(): Store {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}
function persist() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(store));
  listeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useStore(): Store {
  return useSyncExternalStore(
    subscribe,
    () => store,
    () => DEFAULT,
  );
}

export const actions = {
  addCategory(name: string) {
    store = { ...store, categories: [...store.categories, { id: crypto.randomUUID(), name }] };
    persist();
  },
  updateCategory(id: string, name: string) {
    store = { ...store, categories: store.categories.map((c) => (c.id === id ? { ...c, name } : c)) };
    persist();
  },
  deleteCategory(id: string) {
    store = {
      ...store,
      categories: store.categories.filter((c) => c.id !== id),
      products: store.products.filter((p) => p.categoryId !== id),
    };
    persist();
  },
  addProduct(p: Omit<Product, "id">) {
    store = { ...store, products: [...store.products, { ...p, id: crypto.randomUUID() }] };
    persist();
  },
  updateProduct(id: string, patch: Partial<Product>) {
    store = { ...store, products: store.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) };
    persist();
  },
  deleteProduct(id: string) {
    store = { ...store, products: store.products.filter((p) => p.id !== id) };
    persist();
  },
  addTransaction(t: Omit<Transaction, "id" | "date">) {
    const tx: Transaction = { ...t, id: crypto.randomUUID(), date: new Date().toISOString() };
    // decrement stock
    const products = store.products.map((p) => {
      const item = t.items.find((i) => i.name === p.name);
      return item ? { ...p, stock: Math.max(0, p.stock - item.qty) } : p;
    });
    store = { ...store, transactions: [tx, ...store.transactions], products };
    persist();
    return tx;
  },
  updateSettings(patch: Partial<Settings>) {
    store = { ...store, settings: { ...store.settings, ...patch } };
    persist();
  },
  reset() {
    store = DEFAULT;
    persist();
  },
};

// Cart state (in-memory only, per session)
type Cart = CartItem[];
let cart: Cart = [];
const cartListeners = new Set<() => void>();
function cartPersist() { cartListeners.forEach((l) => l()); }
export function useCart(): Cart {
  return useSyncExternalStore(
    (cb) => { cartListeners.add(cb); return () => cartListeners.delete(cb); },
    () => cart,
    () => [],
  );
}
export const cartActions = {
  add(productId: string) {
    const found = cart.find((c) => c.productId === productId);
    cart = found
      ? cart.map((c) => (c.productId === productId ? { ...c, qty: c.qty + 1 } : c))
      : [...cart, { productId, qty: 1 }];
    cartPersist();
  },
  setQty(productId: string, qty: number) {
    cart = qty <= 0
      ? cart.filter((c) => c.productId !== productId)
      : cart.map((c) => (c.productId === productId ? { ...c, qty } : c));
    cartPersist();
  },
  remove(productId: string) {
    cart = cart.filter((c) => c.productId !== productId);
    cartPersist();
  },
  clear() { cart = []; cartPersist(); },
};

export const formatIDR = (n: number) =>
  "Rp " + Math.round(n).toLocaleString("id-ID");
