import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-scroll";

const NavbarLogo = () => {
  return (
    <div>
      <Link
        className="cursor-pointer "
        to="home"
        smooth={true}
        spy={true}
        duration={500}
        offset={-200}
      >
        <img
          src={logo}
          alt=""
          className="w-18 h-auto rounded-full sm:hidden md:block hover:scale-90 transition-all duration-500 "
        />
        <img
          src={logo}
          alt=""
          className="w-18 rounded-full sm:block md:hidden hover:scale-90 transition-all duration-500"
        />
      </Link>
    </div>
  );
};

export default NavbarLogo;
