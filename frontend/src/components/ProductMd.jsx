import React, { useContext } from "react";
import { FaStar, FaHeart, FaMinus, FaPlus } from "react-icons/fa6";
import { ShopContext } from "../context/ShopContext";
import { LuMoveUpRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ProductMd = (props) => {
  const { product } = props;
  const { addToCart, removeFromCart, cartItems, url } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <section className="max-padd-container flex flex-col gap-8 xl:flex-row bg-primary py-4">
      {/* Bagian kiri */}
      <div className="flex gap-4 flex-row xl:flex-1 py-5">
        {/* Thumbnail */}
        <div className="flex flex-col gap-3 items-center">
          {[...Array(4)].map((_, index) => (
            <img
              key={index}
              src={url + "/images/" + product.image}
              alt="productImg"
              className="h-[60px] w-[60px] sm:h-[89px] sm:w-[89px] rounded-lg bg-gray-10 object-cover"
            />
          ))}
        </div>

        {/* Gambar utama */}
        <div className="w-full max-w-[500px] aspect-square">
          <img
            src={url + "/images/" + product.image}
            alt="bigImg"
            className="w-full h-full rounded-xl bg-gray-10 object-contain"
          />
        </div>
      </div>

      {/* Bagian kanan */}
      <div className="flex flex-col gap-4 xl:flex-[1.5] bg-white px-6 py-4 rounded-xl">
        <h4 className="bold-28">{product.name}</h4>
        <div className="flex items-baseline gap-x-6 bold-24 sm:bold-28 mt-3">
          <div>{`Rp.${product.price.toLocaleString("id-ID")}`}</div>
          <div className="flex items-start gap-x-1 medium-16 text-secondary">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <p>(223)</p>
          </div>
        </div>

        {/* Warna & Ukuran */}
        <div className="flex flex-col sm:flex-row gap-x-10 gap-y-3 my-4">
          {/* Warna */}
          <div>
            <h4 className="bold-16">Pilih Warna:</h4>
            <div className="flex gap-3 my-3">
              <div className="h-10 w-10 flexCenter cursor-pointer rounded-sm bg-secondaryRed border-b-black active-color"></div>
              <div className="h-10 w-10 flexCenter cursor-pointer rounded-sm bg-secondaryYellow"></div>
              <div className="h-10 w-10 flexCenter cursor-pointer rounded-sm bg-secondaryBlue"></div>
              <div className="h-10 w-10 flexCenter cursor-pointer rounded-sm bg-secondaryGreen"></div>
            </div>
          </div>

          {/* Ukuran */}
          <div>
            <h4 className="bold-16">Pilih Ukuran:</h4>
            <div className="flex gap-3 my-3">
              {["S", "M", "L", "XL", "XXL"].map((size, i) => (
                <div
                  key={i}
                  className={`border-[1.5px] ${
                    size === "M" ? "border-slate-900" : "border-slate-900/15"
                  } h-10 w-10 flexCenter cursor-pointer rounded-sm`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-4 flex-wrap items-center">
          <button className="btn-secondary rounded-sm !px-4">
            <FaHeart />
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="btn-dark rounded-sm sm:!px-20 !py-2 flexCenter gap-x-2"
          >
            Go to cart <LuMoveUpRight className="text-x1" />
          </button>

          {!cartItems[product._id] ? (
            <FaPlus
              onClick={() => addToCart(product._id)}
              className="bg-secondary text-white rounded-sm h-[38px] w-[38px] p-2 cursor-pointer"
            />
          ) : (
            <div className="flex items-center rounded-sm bg-black text-white">
              <button
                onClick={() => removeFromCart(product._id)}
                className="h-[38px] w-[38px] flex items-center justify-center"
              >
                <FaMinus />
              </button>
              <span className="w-[38px] text-center">
                {cartItems[product._id]}
              </span>
              <button
                onClick={() => addToCart(product._id)}
                className="bg-secondary text-white h-[38px] w-[38px] flex items-center justify-center"
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>

        {/* Kategori & Tag */}
        <p>
          <span className="medium-16 text-tertiary">Kategori :</span> Wanita |
          Jaket | Musim Dingin
        </p>
        <p>
          <span className="medium-16 text-tertiary">Tag :</span> Modern | Produk
          Terbaru
        </p>
      </div>
    </section>
  );
};

export default ProductMd;
