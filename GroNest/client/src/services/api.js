export async function fetchProducts() {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    const res = await fetch(`${apiUrl}/api/products`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
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
    const mod = await import('../data/products.json');
    return mod.default ?? mod;
  }
}
