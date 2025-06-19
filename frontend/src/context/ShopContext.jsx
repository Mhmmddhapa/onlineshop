import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [all_products, setAll_products] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    const localToken = localStorage.getItem("token");
    if (localToken) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          }
        );
      } catch (err) {
        console.error("Gagal menambahkan item ke keranjang:", err.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;

      const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updatedCart[itemId] <= 0) {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    const localToken = localStorage.getItem("token");
    if (localToken) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          }
        );
      } catch (err) {
        console.error("Gagal menghapus item dari keranjang:", err.message);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_products.find(
          (product) => product._id?.toString() === item
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      totalItems += cartItems[item];
    }
    return totalItems;
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchProductList = async () => {
    try {
      const response = await axios.get(url + "/api/product/list");
      setAll_products(response.data.data);
    } catch (err) {
      console.error("Gagal mengambil produk:", err.message);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(response.data.cartData || {});
    } catch (err) {
      console.error("Gagal memuat data keranjang:", err.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchProductList();
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        await loadCartData(localToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    all_products,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    url,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
