import { useStore } from "../context/StoreContext";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { successStyle, errorStyle } from "../utils/toastStyle";

const WishlistModal = ({ onClose }) => {
  const { wishlist, removeFromWishlist } = useStore();
  const handleRemove = (id) => {
    removeFromWishlist(id);
    toast.error("Wishlistdan olib tashlandi !" , errorStyle);
};

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999] backdrop-blur-3xl">
      <div className="bg-black text-white w-[800px] p-6 rounded-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-5 text-center"> Wishlist </h2>
        {wishlist.length === 0 ? (
          <p className="text-center text-red-600 font-bold text-2xl"> Wishlist bo'sh ! </p>
        ) : (
          <>
            {wishlist.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-gray-700 py-4">
                <div className="flex items-center gap-5">
                  <p className="font-bold text-2xl"> {item.id} </p>
                  <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded-full" />

                  <div>
                    <h3 className="font-bold text-2xl"> {item.title} </h3>
                    <p className="font-bold text-green-500 text-xl mt-2"> {item.price.toLocaleString()} so'm </p>
                  </div>
                </div>

                <button className="text-red-600 text-4xl hover:text-red-400 hover:scale-110 transition-all duration-300" 
                  onClick={() => handleRemove(item.id)}>
                  <FaHeart />
                </button>
              </div>
            ))}
          </>
        )}

        <div className="flex justify-end mt-6">
          <button className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-red-600 hover:text-white transition"
            onClick={onClose}>
              Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default WishlistModal;