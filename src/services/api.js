export async function getCategories() {
  const fetchApi = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await fetchApi.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const fetchProduct = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const product = await fetchProduct.json();
  return product;
}

export async function getProductsByCategory(categoryId) {
  const fetchProduct = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  const product = await fetchProduct.json();
  return product;
}

export async function getProductsByQuery(query) {
  const fetchProduct = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const product = await fetchProduct.json();
  return product;
}

export async function getProductsById(id) {
  const fetchProduct = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const product = await fetchProduct.json();
  return product;
}
