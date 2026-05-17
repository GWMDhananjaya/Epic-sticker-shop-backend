import React from "react";

import { BsWhatsapp } from "react-icons/bs";
const NavbarBtn = () => {
  return (
    <div className="sm:hidden md:block mt-0.5   ">
      <a
        href="https://wa.me/+94767847059"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsWhatsapp className="bg-green-400 rounded-full w-10 h-auto" />
      </a>
    </div>
  );
};

export default NavbarBtn;
