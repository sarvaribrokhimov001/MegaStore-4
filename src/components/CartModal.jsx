import { useStore } from "../context/StoreContext";
import toast from "react-hot-toast";
import { successStyle, errorStyle } from "../utils/toastStyle";

  const CartModal = ({ onClose }) => {
    const { cart, removeFromCart } = useStore();
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity,0);
    const handleRemove = (item) => {
      removeFromCart(item.id);
      toast.error("Mahsulot savatchadan olib tashlandi !", errorStyle);
    };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 backdrop-blur-3xl">
      <div className="bg-white text-black w-[800px] p-6 rounded-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-5 text-center"> Savatcha </h2>

        {cart.length === 0 ? (
          <p className="text-center text-red-600 font-bold text-2xl"> Savatcha bo'sh ! </p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold"> {item.id} </p>
                  <img src={item.image} alt={item.title} className="w-35 h-35 object-cover rounded-full ml-5" />

                  <div>
                    <h3 className="font-bold text-2xl"> {item.title} </h3>
                    <p className="font-bold text-2xl mt-2"> 
                        {item.quantity} x {" "} 
                        {item.price.toLocaleString()} so'm 
                    </p>
                  </div>
                </div>

                <button onClick={() => handleRemove(item)} className="bg-black text-white px-4 py-2 rounded hover:text-red-600 font-bold transition"> O'chirish </button>
              </div>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold"> Jami: </h3>
              <span className="text-2xl font-bold text-green-600">
                {totalPrice.toLocaleString()} so'm
              </span>
            </div>
          </>
        )}

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="bg-black text-white w-[120px] h-[40px] rounded-2xl block m-auto font-bold hover:text-red-600 transition"> Close </button>
        </div>
      </div>
    </div>
  );
};
export default CartModal;