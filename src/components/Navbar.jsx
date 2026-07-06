import { FaRegHeart } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useStore } from "../context/StoreContext";
import { useState } from "react";
import WishlistModal from "./WishlistModal";
import CartModal from "./CartModal";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Navbar = () => {
  const { wishlist, cart, searchTerm, setSearchTerm } = useStore();
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { user, logout } = useAuth();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <div className='w-full h-25 bg-black text-white flex items-center justify-evenly'>
      <h1 className='font-bold pr-90 text-4xl'> MegaStore 4 </h1>

        <ul className='flex justify-center items-center gap-10'>
          <li> <Link className='font-bold hover:text-red-600 text-[20px]' to="/"> Home </Link> </li>
          <li> <Link className='font-bold hover:text-red-600 text-[20px]' target="_blank" rel="noreferrer" to="https://swiperjs.com/"> Swiper </Link> </li>
          <li> <Link className='font-bold hover:text-red-600 text-[20px]' target="_blank" rel="noreferrer" to="https://react-slick.neostack.com/"> Slick </Link> </li>
          <li> <Link className='font-bold hover:text-red-600 text-[20px]' target="_blank" rel="noreferrer" to="https://www.react-fast-marquee.com/"> FastMarquee </Link> </li>
        </ul>

        <form>
          <input 
            className='bg-neutral-600 rounded-2xl w-[320px] h-[40px] pl-5 text-[18px] focus:bg-black focus:text-red-600 pr-2 font-bold' 
            placeholder='Search....' 
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form> 

      <div className='flex gap-10'>
        <div className="relative">
          <button onClick={() => setOpenWishlist(true)}> <FaRegHeart className="text-3xl" /> </button>
          <span className="absolute -top-2 -right-2 bg-red-600 w-5 h-5 rounded-full text-xs flex items-center justify-center"> {wishlist.length} </span>
        </div>

        <div className="relative">
          <button onClick={() => setOpenCart(true)}> <GiShoppingCart className="text-4xl" /> </button>
          <span className="absolute -top-2 -right-2 bg-green-600 w-5 h-5 rounded-full text-xs flex items-center justify-center"> {cart.length} </span>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-bold"> {user.username} </span>
            <button className="text-red-600 font-bold w-[120px] border-4 text-[20px] hover:text-yellow-400 active:text-green-600 transition-all px-3 py-1 rounded-lg" onClick={logout}> Logout </button>
          </div>
         ) : (
          <button className="bg-black font-bold hover:text-red-600 border-4 transition-all px-6 py-2 rounded-lg" onClick={()=>setOpenLogin(true)}> Login </button>
         ) 
        }
      </div> 

        { openWishlist && (<WishlistModal onClose={() => setOpenWishlist(false)} />) }
        { openCart && (<CartModal onClose={() => setOpenCart(false)} />) }
        { openLogin && <LoginModal onClose={() => setOpenLogin(false)} openRegister={() => setOpenRegister(true)} /> }
        { openRegister && <RegisterModal onClose={() => setOpenRegister(false)} openLogin={()=>setOpenLogin(true)} /> }
    </div>
  )
}
export default Navbar