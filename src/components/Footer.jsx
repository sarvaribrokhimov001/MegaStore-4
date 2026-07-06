import React from 'react'
import { Link } from 'react-router-dom'
import { GiShoppingCart } from 'react-icons/gi'
import { FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='w-full bg-black text-white py-10 mt-10'>
      <div className='flex justify-around items-center'>
        <div className='flex items-center gap-3'>
          <h2 className='text-3xl font-bold'> MegaStore 4 </h2>
          <GiShoppingCart className='text-4xl' />
        </div>

        <ul className='flex flex-wrap justify-center items-center gap-8 font-medium'>
          <li> <Link to="/" className='hover:text-red-600 transition duration-300 font-bold text-[20px]'> Home </Link> </li>
          <li> <Link href="https://swiperjs.com/" target="_blank" rel="noreferrer" className='hover:text-red-600 transition duration-300 font-bold text-[20px]'> Swiper </Link> </li>
          <li> <Link href="https://react-slick.neostack.com/" target="_blank" rel="noreferrer" className='hover:text-red-600 transition duration-300 font-bold text-[20px]'> Slick </Link> </li>
          <li> <Link href="https://www.react-fast-marquee.com/" target="_blank" rel="noreferrer" className='hover:text-red-600 transition duration-300 font-bold text-[20px]'> FastMarquee </Link> </li>
        </ul>

        <div className="flex items-center gap-5">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-3xl hover:text-pink-500 transition"> <FaInstagram /> </a>
          <a href="https://t.me" target="_blank" rel="noreferrer" className="text-3xl hover:text-sky-500 transition"> <FaTelegram /> </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-3xl hover:text-red-600 transition"> <FaYoutube /> </a>
        </div>

        <p className='text-gray-400 text-sm font-bold text-[18px]'> © 2026 MegaStore. All rights reserved. </p>
      </div>
    </footer>
  )
}
export default Footer