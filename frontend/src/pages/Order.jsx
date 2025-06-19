import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, cartItems, all_products, url, token } =
    useContext(ShopContext);

  const [data, setData] = useState({
    NamaDepan: "",
    NamaBelakang: "",
    email: "",
    noTelepone: "",
    alamatlengkap: "",
    kecamatan: "",
    kelurahan: "",
    kota: "",
    kodepos: "",
    catatan: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getShippingFee = (subtotal) => {
    if (subtotal === 0) return 0;
    if (subtotal < 100000) return 10000;
    return 5000;
  };

  const subtotal = getTotalCartAmount();
  const shippingFee = getShippingFee(subtotal);
  const total = subtotal + shippingFee;

  const placeOrder = async (e) => {
    e.preventDefault();
    const orderItems = [];

    for (const item of all_products) {
      const quantity = cartItems[item._id];
      if (quantity > 0) {
        orderItems.push({
          _id: item._id,
          name: item.name,
          price: item.new_price,
          quantity,
        });
      }
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: total,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Redirect ke halaman Snap Midtrans
        window.location.href = response.data.redirect_url;
      } else {
        alert("Gagal memproses pembayaran.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Terjadi kesalahan saat mengirim pesanan.");
    }
  };

  useEffect(() => {
    if(!token) {
      navigate("/cart");
    } else if(getTotalCartAmount === 0) {
        navigate("/cart");
      }
  }, [token]);

  return (
    <section className="max-padd-container py-28 xl:py-32">
      <form
        onSubmit={placeOrder}
        className="flex flex-col xl:flex-row gap-20 xl:gap-28"
      >
        {/* Form Pengiriman */}
        <div className="flex flex-1 flex-col gap-3 text-[95%]">
          <h3 className="bold-28 mb-4">Detail Pengiriman</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              name="NamaDepan"
              required
              value={data.NamaDepan}
              onChange={onChangeHandler}
              placeholder="Nama Depan"
              className="form-input"
            />
            <input
              name="NamaBelakang"
              required
              value={data.NamaBelakang}
              onChange={onChangeHandler}
              placeholder="Nama Belakang"
              className="form-input"
            />
            <input
              name="email"
              type="email"
              required
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Email"
              className="form-input"
            />
            <div className="flex items-center mb-4">
              <span className="px-3 py-3 bg-gray-100 border border-gray-300 rounded-l-md text-gray-600">
                +62
              </span>
              <input
                name="noTelepone"
                required
                value={data.noTelepone}
                onChange={onChangeHandler}
                placeholder="81234567890"
                className="form-input rounded-l-none"
              />
            </div>
            <input
              name="alamatlengkap"
              required
              value={data.alamatlengkap}
              onChange={onChangeHandler}
              placeholder="Alamat Lengkap"
              className="form-input"
            />
            <input
              name="kecamatan"
              required
              value={data.kecamatan}
              onChange={onChangeHandler}
              placeholder="Kecamatan"
              className="form-input"
            />
            <input
              name="kelurahan"
              required
              value={data.kelurahan}
              onChange={onChangeHandler}
              placeholder="Kelurahan"
              className="form-input"
            />
            <input
              name="kota"
              required
              value={data.kota}
              onChange={onChangeHandler}
              placeholder="Kota / Kabupaten"
              className="form-input"
            />
            <input
              name="kodepos"
              required
              value={data.kodepos}
              onChange={onChangeHandler}
              placeholder="Kode Pos"
              className="form-input"
            />
            <textarea
              name="catatan"
              value={data.catatan}
              onChange={onChangeHandler}
              placeholder="Catatan untuk kurir (opsional)"
              className="form-input col-span-2 resize-none"
            />
          </div>
        </div>

        {/* Ringkasan Pesanan */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="flexBetween py-3">
            <h4>Subtotal:</h4>
            <h4>{formatRupiah(subtotal)}</h4>
          </div>
          <hr />
          <div className="flexBetween py-3">
            <h4>Biaya Pengiriman:</h4>
            <h4>{formatRupiah(shippingFee)}</h4>
          </div>
          <hr />
          <div className="flexBetween py-3">
            <h4>Total:</h4>
            <h4 className="bold-18">{formatRupiah(total)}</h4>
          </div>
          <button type="submit" className="btn-secondary w-56 rounded-sm">
            Lanjutkan ke Pembayaran
          </button>
        </div>
      </form>
    </section>
  );
};

export default Order;
