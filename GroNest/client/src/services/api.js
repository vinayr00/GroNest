import productsData from "../data/products.json";

export async function fetchProducts() {
  try {
    const data = productsData;
    // Normalize image URLs: ensure local filenames become /assets/products/paths
    const normalized = data.map((p) => {
      const img = p.image || '';
      let imageUrl = img;
      if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
        imageUrl = `/assets/products/${imageUrl}`;
      }
      return { ...p, image: imageUrl };
    });
    return normalized;
  } catch (err) {
    console.error("Failed to load products data", err);
    return [];
  }
}
