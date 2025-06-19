import React from "react";
import { Link } from "react-router-dom";
import { BsFire } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section id="home" className="max-pad-container bg-hero bg-center bg-cover bg-no-repeat h-[777px] w-full">
      <div className="relative max-w-[666px] top-44 xs:top-72">
        <h4 className="flex items-baseline gap-x-2 uppercase text-secondary medium-18">
          Koleksi Jaman Now <BsFire />
        </h4>
        <h2 className="h1 capitalize">
          Nikmati potongan harga sampai 20% pada produk tertentu
        </h2>
        <p className="border-1-4 border-secondary pl-3 my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolorum,
          voluptatum similique dignissimos tenetur vitae deserunt at,{" "}
        </p>

        {/* button */}
        <div className="flex items-center gap-x-4 mt-7">
          <Link
            to={""}
            className="btn-secondary rounded-full flexCenter gap-x-2"
          >
            Yang Paling Baru <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
