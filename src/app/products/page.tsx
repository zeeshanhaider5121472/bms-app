// src/app/products/page.tsx — the folder name IS the URL
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products" };

const PRODUCTS = [
  { id: 1, name: "Notebook", price: 1.5, emoji: "📓" },
  { id: 2, name: "Pencil Set", price: 2.99, emoji: "✏️" },
  { id: 3, name: "Backpack", price: 24.0, emoji: "🎒" },
  { id: 4, name: "Calculator", price: 12.5, emoji: "🧮" },
  { id: 5, name: "Ruler", price: 0.99, emoji: "📏" },
  { id: 6, name: "Highlighters", price: 4.75, emoji: "🖍️" },
];

export default function ProductsPage() {
  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl font-bold text-slate-100">Products</h2>
      <p className="mt-1 text-sm text-slate-400">
        Everything you can buy from the school store.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-emerald-500/50"
          >
            <div className="text-4xl">{p.emoji}</div>
            <h3 className="mt-3 font-semibold text-slate-100">{p.name}</h3>
            <p className="mt-1 text-sm font-bold text-emerald-400">
              ${p.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
