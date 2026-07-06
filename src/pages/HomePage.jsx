import React, { useState } from "react";
import Banners from "../components/Banners";
import Categories from "../components/Categories";
import Products from "../components/Products";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  return (
    <>
      <Banners />
      <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <Products selectedCategory={selectedCategory} />
    </>
  );
};
export default HomePage;