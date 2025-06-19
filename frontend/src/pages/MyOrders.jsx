import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { FaBox } from "react-icons/fa";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(ShopContext);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <section className="max-padd-container pt-20">
      <div className="py-10">
        <h4 className="bold-24">My Orders</h4>
        <table className="w-full mt-28">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-center py-12">
              <th className="p-3 hidden sm:table-cell">Paket</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Status</th>
              <th className="p-3">Lacak</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, i) => (
              <tr
                key={i}
                className="border-b border-slate-900/20 text-gray-50 medium-14 text-center"
              >
                <td className="p-3 hidden sm:table-cell">
                  <div className="flex justify-center items-center">
                    <FaBox className="text-2xl text-secondary" />
                  </div>
                </td>
                <td className="p-3">
                  <p>
                    {order.items.map((item, index) => (
                      <span key={index}>
                        {item.name || "Produk Tidak Diketahui"} ×{" "}
                        {item.quantity}
                        {index < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                </td>
                <td className="p-3">
                  Rp.{order.amount.toLocaleString("id-ID")}
                </td>
                <td className="p-3">{order.items.length}</td>
                <td className="p-3">
                  <div className="flex justify-center items-center gap-x-2">
                    <span className="hidden lg:flex">&#x25cf;</span>
                    <b>{order.status}</b>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex justify-center">
                    <button
                      onClick={fetchOrders}
                      className="btn-light rounded-sm !py-2"
                    >
                      Lacak
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyOrders;
