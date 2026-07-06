import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categoryApi";

const Categories = ({selectedCategory, setSelectedCategory}) => {
  const {data: categories, isLoading, error} = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  });

  if (isLoading) {
    return (
      <h1 className="text-center text-3xl text-red-600 font-bold"> Loading... </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-center text-red-600 text-3xl font-bold"> Xatolik yuz berdi ! </h1>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-17 text-center"> Categories </h2>

      <div className="flex justify-center gap-40">
        {categories.map((category) => (
          <button onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)} 
            key={category.id} 
            className={`rounded-xl flex flex-col justify-center gap-3 w-[240px] h-[180px]
            ${selectedCategory === category.id ? "bg-neutral-600" : "bg-black"}`}>
            <span className="text-8xl"> {category.icon} </span>
            <h3 className="font-bold text-lg text-white mt-2"> {category.name} </h3>
          </button>
        ))}
      </div>
    </section>
  );
};
export default Categories;