import midtransClient from "midtrans-client";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const frontend_url = "http://localhost:5173";

const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    // 1. Simpan pesanan ke DB
    const newOrder = new orderModel({
      userId: req.user.userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // 2. Kosongkan keranjang
    await userModel.findByIdAndUpdate(req.user.userId, { cartData: {} });

    // 3. Inisialisasi Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    // 4. Parameter transaksi Snap
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${newOrder._id}-${Date.now()}`,
        gross_amount: Math.max(1000, Math.floor(amount)),
      },
      customer_details: {
        first_name: address.NamaDepan || "User",
        last_name: address.NamaBelakang || "Default",
        email: address.email || "user@example.com",
        phone: `62${address.noTelepone}`, // Tanpa +, harus 62
        billing_address: {
          address: address.alamatlengkap || "Alamat Default",
          city: address.kota || "Jakarta",
          postal_code: address.kodepos || "12345",
          country_code: "IDN",
        },
      },
      callbacks: {
        finish: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        },
    };

    // 5. Buat transaksi Snap
    const transaction = await snap.createTransaction(parameter);

    // 6. Kirim redirect_url Snap (v4)
    res.json({
      success: true,
      redirect_url: transaction.redirect_url, // v4 Snap URL
    });
  } catch (error) {
    console.error("Midtrans Error:", error.response?.data || error);
    res.status(500).json({
      success: false,
      message: "Gagal membuat transaksi",
      detail: error.message,
    });
  }
};

// verify order
const verifyOrder = async (req, res) => {
  const {orderId, success} = req.body;
  try {
    if(success === "true") {
      // Update order status to 'paid'
      await orderModel.findByIdAndUpdate(orderId, { status: "Sudah Bayar" });
      res.json({
        success: true,
        message: "Pesanan berhasil diverifikasi",
      });
    } else {
      await orderModel.findByIdAndUpdate(orderId);
      res.json({
        success: false,
        message: "Verifikasi pesanan gagal",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}

// user order frontend
const userOrders = async(req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.userId });
    res.json({success: true, data: orders});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"});
  }
}

// Listing order for admin
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
    res.json({ success: true, message: "Status order berhasil diperbarui" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
    
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
