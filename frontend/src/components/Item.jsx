import React, { useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Item = ({ product }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(ShopContext);

  return (
    <div className="flex flex-col h-full bg-pink-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Gambar dan Link */}
      <Link to={`/product/${product._id}`} className="w-full h-62 relative">
        <img
          src={url + "/images/" + product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Konten Produk */}
      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <h4 className="text-base font-semibold line-clamp-1">
            {product.name}
          </h4>
          <h5 className="text-sm text-gray-500">{product.category}</h5>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Harga dan Tombol Keranjang */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-orange-600 font-bold text-lg">
            Rp {product.price.toLocaleString("id-ID")}
          </span>

          {!cartItems[product._id] ? (
            <FaPlus
              onClick={() => addToCart(product._id)}
              className="bg-white h-8 w-8 p-2 rounded-full shadow-inner cursor-pointer"
            />
          ) : (
            <div className="bg-white rounded-full flex items-center gap-2 px-2 py-1 shadow">
              <FaMinus
                onClick={() => removeFromCart(product._id)}
                className="bg-primary h-6 w-6 p-1 cursor-pointer rounded-full text-black"
              />
              <span className="text-sm">{cartItems[product._id]}</span>
              <FaPlus
                onClick={() => addToCart(product._id)}
                className="bg-secondary h-6 w-6 p-1 cursor-pointer rounded-full text-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
