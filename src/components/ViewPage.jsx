import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsId } from "../hooks/useGetProductsId";
import { useStore } from "../context/StoreContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { successStyle, errorStyle } from "../utils/toastStyle";

const ViewPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductsId(id);
  const [quantity, setQuantity] = useState(0);
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const { user } = useAuth();

  if (isLoading) {
    return <h1 className="text-center text-4xl text-red-600"> Loading... </h1>;
  }

  const handleWishlist = () => {
    if (!user) {
      toast.error("Wishlist uchun login qiling !" , errorStyle);
      return;
    }

    const exists = wishlist.find((item) => item.id === data.id);
    toggleWishlist(data);

    if (exists) {
      toast.error("Wishlistdan olib tashlandi !" , errorStyle);
    } else {
      toast.success("Wishlistga qo'shildi !" , successStyle);
    }
  };

const handleCart = () => {
  if (!user) {
    toast.error("Xarid qilish uchun login qiling !" , errorStyle);
    return;
  }

  if (quantity === 0) {
    toast.error("Avval mahsulot sonini tanlang !" , errorStyle);
    return;
  }

  addToCart({
    ...data,
    quantity,
  });
  toast.success(`${quantity} ta mahsulot savatchaga qo'shildi !` , successStyle);
};

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="p-10 flex justify-center items-center flex-col gap-7">
      <img src={data.image} alt={data.title} className="w-[600px] rounded-full" />
      <div>
        <p className="text-5xl font-bold"> <span className="text-red-600"> Id: </span> {data.id} </p>
        <h1 className="text-5xl font-bold"> <span className="text-red-600"> Name: </span> {data.title} </h1>
        <p className="text-5xl font-bold"> <span className="text-red-600"> Price: </span> {data.price.toLocaleString()} so'm </p>
        <p className="text-5xl font-bold"> <span className="text-red-600"> OldPrice: </span> <del> {data.oldPrice?.toLocaleString()} so'm </del> </p>
        <p className="text-5xl font-bold"> <span className="text-red-600"> CategoryId: </span> {data.categoryId} </p>
        <p className="text-5xl font-bold"> <span className="text-red-600"> ReviewCount: </span> {data.reviewCount} </p>
        <p className="text-5xl font-bold"> <span className="text-red-600"> Rating: </span> ⭐ {data.rating} </p>

        <div className="flex items-center gap-5 mt-8">
          <button onClick={handleWishlist}>
            {wishlist.find((item) => item.id === data.id) ? (
              <FaHeart className="text-red-600 text-5xl" />
              ) : (
              <FaRegHeart className="text-black text-5xl hover:text-red-600 transition" />
            )}
          </button>

          <button className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-900 transition"
            onClick={handleCart}>
              <GiShoppingCart className="text-4xl" />
          </button>
        </div>

        <div className="mt-8">
          {quantity === 0 ? (
            <button onClick={increaseQuantity} className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition">
              Add
            </button>
          ) : (
            <div className="flex items-center gap-5">
              <button onClick={decreaseQuantity} className="w-12 h-12 rounded-full bg-red-600 text-white text-2xl font-bold hover:bg-red-700">
                -
              </button>
              <span className="text-4xl font-bold"> {quantity} </span>
              <button onClick={increaseQuantity} className="w-12 h-12 rounded-full bg-green-600 text-white text-2xl font-bold hover:bg-green-700">
                +
              </button>
            </div>
          )}
        </div>
    </div>
  </div>
  );
};
export default ViewPage;