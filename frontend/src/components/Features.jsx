import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { TbPackageImport } from "react-icons/tb";

const Features = () => {
  return (
    <section className="max-padd-container bg-primary mt-16 xl:mt-18 py-8 rounded-xl">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Gratis Ongkir - Pengiriman */}
        <div className="flexCenter gap-x-4">
          <LiaShippingFastSolid className="text-4xl" />
          <div>
            <h5 className="medium-18">Gratis Ongkir</h5>
            <p>untuk Pembelian di atas Rp. 100.000</p>
          </div>
        </div>

        {/* Gratis Ongkir - Rp Icon */}
        <div className="flexCenter gap-x-4">
          <span className="text-2xl font-bold bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
            Rp
          </span>
          <div>
            <h5 className="medium-18">Gratis Ongkir</h5>
            <p>untuk Pembelian di atas Rp. 100.000</p>
          </div>
        </div>

        {/* Gratis Ongkir - Support */}
        <div className="flexCenter gap-x-4">
          <BiSupport className="text-4xl" />
          <div>
            <h5 className="medium-18">Gratis Ongkir</h5>
            <p>untuk Pembelian di atas Rp. 100.000</p>
          </div>
        </div>

        {/* Gratis Ongkir - Return */}
        <div className="flexCenter gap-x-4">
          <TbPackageImport className="text-4xl" />
          <div>
            <h5 className="medium-18">Gratis Ongkir</h5>
            <p>untuk Pembelian di atas Rp. 100.000</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
