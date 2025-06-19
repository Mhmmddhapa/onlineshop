import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBox } from "react-icons/fa";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Gagal mengambil data pesanan");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat memuat data");
    }
  };

  const statusHandler = async (event, orderId) => {
    // console.log(event, orderId);
    const response = await axios.post(url + "/api/order/status", {orderId, status: event.target.value})
    if(response.data.success) {
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <section className="p-4 sm:p-10 box-border w-full">
      <div className="overflow-x-auto mt-5">
        <h4 className="bold-24 uppercase">Halaman Order</h4>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-center py-12">
              <th className="p-3 hidden sm:table-cell">Paket</th>
              <th className="p-3 text-left">Order</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={i}
                className="border-b border-slate-900/20 text-gray-50 medium-14 text-center"
              >
                <td className="p-3 hidden sm:table-cell">
                  <div className="flex justify-center items-center">
                    <FaBox className="text-2xl text-secondary" />
                  </div>
                </td>
                <td className="p-3 text-left">
                  <p>
                    {Array.isArray(order.items) &&
                      order.items.map((item, index) => (
                        <span key={index}>
                          {item.name || "Produk Tidak Diketahui"} ×{" "}
                          {item.quantity}
                          {index < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                  </p>
                  <hr className="w-1/2 my-1" />
                  <div>
                    <h5 className="medium-15">
                      {order.address
                        ? `${order.address.NamaDepan || ""} ${
                            order.address.NamaBelakang || ""
                          }`
                        : "Tanpa Nama"}
                    </h5>
                    <p>
                      {order.address
                        ? `${order.address.alamatlengkap}, ${order.address.kota}, ${order.address.kodepos}, ${order.address.kecamatan}, ${order.address.kelurahan}`
                        : "Tidak Ada Alamat"}
                    </p>
                    <p>
                      {order.address?.noTelepone || "Tidak ada Nomer telepon"}
                    </p>
                  </div>
                </td>
                <td className="p-1">
                  Rp.{order.amount?.toLocaleString("id-ID") || "0"}
                </td>
                <td className="p-1">{order.items?.length || 0}</td>
                <td className="p-1">
                  <select
                  onChange={(event)=> statusHandler(event,order._id)}
                  value={order.status}
                    className="bg-primary ring-1 ring-secondary text-sm max-w-20 xl:max-w-28"
                    defaultValue={order.status}
                  >
                    <option value="Memuat Produk">Memuat Produk</option>
                    <option value="Sedang dalam proses pengiriman">
                      Sedang dalam proses pengiriman
                    </option>
                    <option value="Produk Dikirim">Produk Dikirim</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
