import React, { useContext, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(ShopContext);
  const [state, setState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // useEffect(() => {
  //   console.log(data);

  // }, [data])

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (state === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="absolute h-full w-full bg-black/40 z-50 flexCenter">
      <form
        onSubmit={onLogin}
        className="bg-white w-[366px] p-7 rounded-xl shadow-md"
      >
        <div className="flex justify-between items-baseline">
          <h4 className="bold-28">{state}</h4>
          <FaXmark
            onClick={() => setShowLogin(false)}
            className="medium-20 text-slate-900/70 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-4 my-6">
          {state === "Daftar akun" && (
            <input
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              type="text"
              placeholder="Nama"
              required
              className="bg-primary border p-2 pl-4 rounded-md outline-none"
            />
          )}
          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="Email"
            required
            className="bg-primary border p-2 pl-4 rounded-md outline-none"
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            type="password"
            placeholder="Password"
            required
            className="bg-primary border p-2 pl-4 rounded-md outline-none"
          />
        </div>
        <button type="submit" className="btn-secondary rounded-md w-full">
          {state === "Daftar akun" ? "Buat akun" : "Login"}
        </button>
        <div className="flex items-baseline gap-x-3 mt-6 mb-4">
          <input type="checkbox" required />
          <p>
            Dengan melanjutkan proses ini, anda dianggap telah menyetujui{" "}
            <span className="underline"> Syarat & Ketentuan</span> serta{" "}
            <span className="underline"> Kebijkan Privasi Kami</span>
          </p>
        </div>
        {state === "Daftar akun" ? (
          <p>
            Sudah punya akun? Masuk di sini.{" "}
            <span
              onClick={() => setState("Login")}
              className="text-secondary cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p>
            Belum punya akun? Daftar sekarang yuk.{" "}
            <span
              onClick={() => setState("Daftar akun")}
              className="text-secondary cursor-pointer"
            >
              Daftar akun
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
