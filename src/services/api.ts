import { products, faqs, type Product, type FAQ } from "./mockData";

// Simulates a real network fetch with a delay.
// The return type matches what a real API would return — a Promise of typed data.
// TanStack Query calls this function; it never knows or cares that it's fake.

export async function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(products), 800)
  );
}

export async function fetchFaqs(): Promise<FAQ[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(faqs), 400)
  );
}
