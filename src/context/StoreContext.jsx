import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const addToCart = (product) => {
  const exists = cart.find((item) => item.id === product.id);

  if (exists) {
    setCart(cart.map((item) => item.id === product.id ? {
      ...item,
      quantity: item.quantity + product.quantity,
    } : item));
  } else {
    setCart([...cart, {
      ...product,
      quantity: product.quantity,
    },
    ]);
  }
};

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <StoreContext.Provider value={{ wishlist, cart, toggleWishlist, addToCart, removeFromCart, removeFromWishlist, searchTerm, setSearchTerm }}> 
      {children} 
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);