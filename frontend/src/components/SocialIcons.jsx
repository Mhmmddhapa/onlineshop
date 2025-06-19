import React from "react";
import { Link } from "react-router-dom";
import {
  RiFacebookFill,
  RiInstagramFill,
  RiTwitterFill,
  RiWhatsappFill,
  RiTiktokFill,
  RiTelegramFill,
  RiPhoneFill,
} from "react-icons/ri";

const SocialIcons = () => {
  return (
    <div className="flex gap-6 pr-4">
      <Link
        to={""}
        className="text-[#08d9d6] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiFacebookFill />
      </Link>
      <Link
        to={""}
        className="text-[#f08a5d] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiInstagramFill />
      </Link>
      <Link
        to={""}
        className="text-[#ff2e63] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiTwitterFill />
      </Link>
      <Link
        to={""}
        className="text-[#eaeaea] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiWhatsappFill />
      </Link>{" "}
      {/* jika tidak tersedia, ganti RiPhoneFill */}
      <Link
        to={""}
        className="text-[#f9ed69] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiTiktokFill />
      </Link>
      <Link
        to={""}
        className="text-[#5272f2] text-2xl hover:-translate-y-1 transition-all duration-500"
      >
        <RiTelegramFill />
      </Link>
    </div>
  );
};

export default SocialIcons;
