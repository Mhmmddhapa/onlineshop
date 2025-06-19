import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { all_products, cartItems, removeFromCart, getTotalCartAmount, url } =
    useContext(ShopContext);

  // Fungsi hitung ongkos kirim otomatis
  const getShippingFee = (subtotal) => {
    if (subtotal === 0) return 0;
    if (subtotal < 100000) return 10000;
    return 5000;
  };

  const subtotal = getTotalCartAmount();
  const shippingFee = getShippingFee(subtotal);
  const total = subtotal + shippingFee;

  return (
    <section className="max-padd-container pt-20">
      <div className="py-10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 py-12">
              <th className="p-1 text-center align-middle">Produk</th>
              <th className="p-1 text-left align-middle max-w-[150px]">
                Nama Produk
              </th>
              <th className="p-1 text-center align-middle">Harga</th>
              <th className="p-1 text-center align-middle">Jumlah</th>
              <th className="p-1 text-center align-middle">Total</th>
              <th className="p-1 text-center align-middle">Hapus Produk</th>
            </tr>
          </thead>
          <tbody>
            {all_products.map((product) => {
              if (cartItems[product._id] > 0) {
                return (
                  <tr
                    key={product._id}
                    className="border-b border-slate-900/20 text-gray-50 p-6 medium-14"
                  >
                    <td className="p-1 text-center align-middle">
                      <img
                        src={url + "/images/" + product.image}
                        alt=""
                        height={45}
                        width={45}
                        className="rounded-lg ring-1 ring-slate-900/5 m-1 inline-block"
                      />
                    </td>
                    <td className="p-1 max-w-[150px] align-middle text-left">
                      <div className="line-clamp-3 break-words">
                        {product.name}
                      </div>
                    </td>
                    <td className="p-1 text-center align-middle">
                      Rp. {product.price.toLocaleString("id-ID")}
                    </td>
                    <td className="p-1 text-center align-middle">
                      {cartItems[product._id]}
                    </td>
                    <td className="p-1 text-center align-middle">
                      Rp.{" "}
                      {(product.price * cartItems[product._id]).toLocaleString(
                        "id-ID"
                      )}
                    </td>
                    <td
                      className="p-1 text-center align-middle"
                      style={{ verticalAlign: "middle" }}
                    >
                      <div className="flex justify-center items-center h-full">
                        <TbTrash
                          onClick={() => removeFromCart(product._id)}
                          className="cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>

        {/* cart detail */}
        <div className="flex flex-col xl:flex-row gap-20 mt-20">
          <div className="flex flex-1 flex-col gap-2">
            <h4 className="bold-22">Transaksi</h4>
            <div>
              <div className="flexBetween py-3">
                <h4 className="medium-16">Subtotal:</h4>
                <h4 className="text-gray-30 font-semibold">
                  Rp. {subtotal.toLocaleString("id-ID")}
                </h4>
              </div>
              <hr className="h-[2px] bg-slate-900/15" />
              <div className="flexBetween py-3">
                <h4 className="medium-16">Ongkir:</h4>
                <h4 className="text-gray-30 font-semibold">
                  Rp. {shippingFee.toLocaleString("id-ID")}
                </h4>
              </div>
              <hr className="h-[2px] bg-slate-900/15" />
              <div className="flexBetween py-3">
                <h4 className="medium-18">Total:</h4>
                <h4 className="bold-18">Rp. {total.toLocaleString("id-ID")}</h4>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/order")}
          className="btn-secondary w-52 rounded"
        >
          Bayar Sekarang
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-8">
        <h4 className="bold-20 capitalize">Masukkan Kode Voucher kamu:</h4>
        <div className="flexBetween h-[2.8rem] bg-primary ring-1 ring-slate-900/10 w-full max-w-[488px] rounded">
          <input
            type="text"
            placeholder="Kode Voucher"
            className="pl-3 bg-transparent border-none outline-none"
          />
          <button className="btn-dark rounded relative !px-10 !py-3">
            Konfirmasi
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
