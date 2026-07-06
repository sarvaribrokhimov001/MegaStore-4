export const getCategories = async () => {
  const response = await fetch("http://localhost:3000/categories");

  if (!response.ok) {
    throw new Error("Categories yuklanmadi");
  }
  return response.json();
}