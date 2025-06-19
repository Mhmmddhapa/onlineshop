import React, { useContext } from "react";
import Item from "./Item";
import { ShopContext } from "../context/ShopContext";

const ProductDisplay = ({ category }) => {
  const { all_products } = useContext(ShopContext);

  return (
    <section id="shop" className="max-padd-container py-16">
      {/* Title */}
      <div className="flexBetween pb-20">
        <h4 className="text-4xl font-extrabold leading-none font-ace flex flex-col">
          <span className="medium-16">Lihat</span>
          Produk
        </h4>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {all_products &&
          all_products.map((product) => {
            if (category === "All" || category === product.category) {
              return (
                <div key={product._id}>
                  <Item product={product} />
                </div>
              );
            }
            return null;
          })}
      </div>
    </section>
  );
};

export default ProductDisplay;
