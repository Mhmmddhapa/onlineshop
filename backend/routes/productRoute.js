import express from "express";
import { addProduct, listProduct, removeProduct } from "../controllers/productController.js";
import multer from "multer";
import path from "path";


const productRouter = express.Router();

// Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // pastikan folder 'uploads' ada
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

// File Filter: izinkan gambar dan video
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/jpg",
    "video/mp4",
    "video/avi",
    "video/mpeg",
    "video/quicktime",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar dan video yang diperbolehkan!"), false);
  }
};

const upload = multer({ storage, fileFilter });

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.get("/list", listProduct);
productRouter.delete("/:id", removeProduct);


export default productRouter;
