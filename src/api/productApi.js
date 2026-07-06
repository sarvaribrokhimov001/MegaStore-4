export const getProducts = async () => {
  const response = await fetch("http://localhost:3000/products");

  if (!response.ok) {
    throw new Error("Products yuklanmadi");
  }
  return response.json();
}