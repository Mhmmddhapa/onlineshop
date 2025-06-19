import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://nyxsyncio:DhapaSync2004@cluster0.mu5ev5y.mongodb.net/OnlineShopDhap"
    ). then(() => console.log("DB Connect")
    );
}