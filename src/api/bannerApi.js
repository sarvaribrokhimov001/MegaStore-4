export const getBanners = async () => {
  const res = await fetch("http://localhost:3000/banners");

  if (!res.ok) {
    throw new Error("Bannerlarni olishda xatolik mavjud !");
  }
  return res.json();
}