import React from "react";
import { NavLink } from "react-router-dom";
import { BsPlusSquare, BsCardList, BsCardChecklist } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="w-1/5 min-h-screen border-r border-r-slate-900/10">
      <div className="flex flex-col gap-10 pt-4 sm:pt-10 pl-[20%]">
        <NavLink
          to={"/add"}
          className={({ isActive }) =>
            isActive
              ? "active-link"
              : "flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 !bg-transparent"
          }
        >
          <BsPlusSquare />
          <p className="hidden lg:flex">Tambahkan Produk</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className={({ isActive }) =>
            isActive
              ? "active-link"
              : "flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 !bg-transparent"
          }
        >
          <BsCardList />
          <p className="hidden lg:flex">Daftar Produk</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className={({ isActive }) =>
            isActive
              ? "active-link"
              : "flexCenter gap-x-2 cursor-pointer h-10 max-w-60 border border-slate-900/15 !bg-transparent"
          }
        >
          <BsCardChecklist />
          <p className="hidden lg:flex">Orderan</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
