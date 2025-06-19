import productModel from "../models/productModel.js";
import fs from "fs";


// add product item
const addProduct = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({
        success: false,
        message: "File gambar atau video wajib diunggah!",
      });
  }

  const image_filename = req.file.filename;

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await product.save();
    res.json({ success: true, message: "Produk Berhasil Ditambahkan" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Terjadi kesalahan saat menyimpan data!",
    });
  }
};

// all product list
const listProduct = async(req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success: true, data: products})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// Remove produk item
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params; // gunakan req.params

    const product = await productModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Produk tidak ditemukan" });
    }

    // Hapus file gambar jika ada
    fs.unlink(`uploads/${product.image}`, (err) => {
      if (err) {
        console.error("Gagal menghapus gambar:", err);
      }
    });

    await productModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Hapus Produk" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan" });
  }
};


export { addProduct, listProduct, removeProduct };