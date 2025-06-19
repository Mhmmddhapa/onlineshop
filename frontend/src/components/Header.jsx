import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/dp.png";
import Navbar from "./Navbar";
import { MdMenu, MdClose } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { ShopContext } from "../context/ShopContext";

const Header = ({setShowLogin}) => {

  const {getTotalCartItems, token, setToken} = useContext(ShopContext)
  const [menuOpened, setMenuOpened] = useState(false);
  const [header, setHeader] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  const logout = () => {
    localStorage.removeItem("token")
    setToken("");
    navigate("/")
  }

  useEffect(() => {
    const scrollYPos = window.addEventListener("scroll", () => {
      window.scrollY > 40 ? setHeader(true) : setHeader(false);
    });

    // Remove Eventlistener
    return () => window.removeEventListener("scroll", scrollYPos);
  });

  return (
    <header
      className={`${
        header ? "!py-3 bg-white shadow-sm" : ""
      } fixed w-full mx-auto top-0 left-0 right-0 py-4 z-30 transition-all max-padd-container flexBetween`}
    >
      {/* logo */}
      <Link to={"/"}>
        <img src={logo} alt="logoImg" height={177} width={177} />
      </Link>

      <div className="flexBetween gap-x-20">
        {/* Navbar Dekstop */}
        <Navbar
          containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"}
        />

        {/* Navbar Mobile */}
        <Navbar
          containerStyles={`${
            menuOpened
              ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
              : "flex items-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"
          }`}
        />
      </div>
      <div className="flexBetween gap-x-3 sm:gap-x-8">
        {/* buttons */}
        {!menuOpened ? (
          <MdMenu
            onClick={toggleMenu}
            className="md:hidden cursor-pointer hover:text-secondary text-2xl"
          />
        ) : (
          <MdClose
            onClick={toggleMenu}
            className="md:hidden cursor-pointer hover:text-secondary text-2xl"
          />
        )}
        <Link to={"/cart"} className="flex relative">
          <GiShoppingBag className="text-[22px] text-white bg-secondary h-9 w-9 p-2 rounded-xl" />
          <span className="bg-white text-sm absolute -top-2 -right-3 flexCenter w-5 h-5 rounded-full shadow-md">
            {getTotalCartItems()}
          </span>
        </Link>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="btn-outline rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="group relative">
            <FaUserCircle className="text-2xl" />
            <ul className="bg-primary shadow-sm p-3 min-w-[160px] whitespace-nowrap ring-1 ring-slate-900/15 rounded absolute right-0 group-hover:flex flex-col hidden">
              <li onClick={() => navigate("/myorders")} className="flexCenter gap-x-2 cursor-pointer">
                <FiPackage className="text-[19px]" />
                <p className="text-sm">Belanjaanku</p>
              </li>
              <hr className="my-2" />
              <li onClick={logout} className="flexCenter gap-x-2 cursor-pointer">
                <TbLogout className="text-[19px]" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
