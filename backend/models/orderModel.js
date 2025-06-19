import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    amount: { type: Number, required: true },
    address: {
      NamaDepan: String,
      NamaBelakang: String,
      email: String,
      noTelepone: String,
      alamatlengkap: String,
      kecamatan: String,
      kelurahan: String,
      kota: String,
      kodepos: String,
      catatan: String,
    },
    status: { type: String, default: "Menunggu Pembayaran" },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
