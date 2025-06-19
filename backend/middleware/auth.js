import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({
      success: false,
      message: "Sesi Anda telah berakhir, silakan login ulang",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: token_decode.id };

    next();
  } catch (error) {
    console.log("Token Error:", error.message);
    res.json({ success: false, message: "Token tidak valid atau kadaluarsa" });
  }
};

export default authMiddleware;
