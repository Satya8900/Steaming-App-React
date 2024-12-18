import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
 
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(e.target[0].value)
    navigate("/searchlist", { state: { search } })
  }
  const changeSerch = (e) => setSearch(e.target.value)
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-between md-max:bg-black px-8 py-4 sticky top-0 z-[99999] transition-all duration-300 ${
        isScrolled ? "bg-black text-white" : "bg-transparent text-white"
      }`}
    >
      <div>
        <img
          className="w-full laptop:w-[160px] sm-max:w-[140px]"
          src={assets.desktopLogo}
          alt="Logo"
        />
      </div>

      <div className="bg-black1 text-gray4 px-10 py-2 xl-max:p-3 xl-max:py-1 rounded-xl border-2 border-black4 flex gap-6 xl-max:gap-4 items-center justify-center lg-max:hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform  duration-300 ease-in-out${
              isActive ? "font-semibold bg-black3 text-white" : "text-gray4"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform  duration-300 ease-in-out${
              isActive ? "font-semibold bg-black3 text-white" : "text-gray4"
            }`
          }
        >
          Movies
        </NavLink>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg text-center hover:scale-110 transition-transform  duration-300 ease-in-out ${
              isActive ? "font-semibold bg-black3 text-white" : "text-gray4"
            }`
          }
        >
          Support
        </NavLink>
      </div>
      {/* Search box */}
      <div className="flex items-center ">
        <FaSearch
          className="inline w-12 z-10 relative sm-max:hidden"
        />
        <div>
          <form onSubmit={handleSubmit} className="flex items-center">

        <input
          type="text"
          value={search}
          onChange={changeSerch}
          className={'rounded-2xl bg-black6 py-2 pl-10 pr-11 sm-max:hidden text-white relative -left-12 z-0'}
        />
      
        <button 
        type="submit"
         className="relative -left-[85px] z-0 sm-max:hidden hover:scale-110 transition-transform  duration-300 ease-in-out">
                    <img src={assets.rightbtn} alt="" />
        </button>
        
          </form>
        </div>
        <img
          onClick={openDrawer}
          className="w-7 sm-max:w-6 lg:hidden"
          src={assets.threeLine}
          alt="Menu Icon"
        />
      </div>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-end">
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        {/* Navigation list */}
        <div className="">
        <NavLink
          to="/"
          onClick={closeDrawer}
          className='block mt-3'
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          onClick={closeDrawer}
          className='block mt-3'
        >
          Movies
        </NavLink>
        <NavLink
          to="/support"
          onClick={closeDrawer}
         className='block mt-3'
        >
          Support
        </NavLink>
        </div>

        {/* Search box side nav */}
        <div className="mt-8">
        <div >
        <div>
          <form onSubmit={handleSubmit} className="flex items-center">

        <input
          type="text"
          value={search}
          onChange={changeSerch}
          className="rounded-xl bg-black6 px-2 py-1"
        />
      
        <button 
        type="submit"
        onClick={closeDrawer}
         className=" hover:scale-110 transition-transform  duration-300 ease-in-out">
                    <img src={assets.rightbtn} alt="" />
        </button>
        
          </form>
        </div>
        
      </div>
        </div>
      </Drawer>
    </div>
  );
}

export default NavigationBar;
