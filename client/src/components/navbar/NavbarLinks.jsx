import React from "react";
import { Link } from "react-scroll";

const links = [
  { link: "About Us", section: "about" },
  { link: "Shop", section: "shop" }, // Add this line
  { link: "Location", section: "Location" },
  { link: "Contact", section: "contact" },
];

const NavbarLinks = () => {
  return (
    <ul className="z-[100] flex gap-4 text-white fond-bold text-center lg:flex-row sm:flex-col lg:relative sm:absolute sm:top-[120%] left-[50%] -translate-x-[50%] lg:text-md sm:text-xl sm:bg-green-300 lg:bg-black sm:w-full py-4">
      {links.map((link, index) => {
        return (
          <li key={index} className="group">
            <Link
              to={link.section}
              smooth={true}
              spy={true}
              duration={500}
              offset={-130}
              className="cursor-pointer xl:text-white lg:text-white sm:text-gray-700 hover:text-gray-5 transition-all duration-500"
            >
              {link.link}
            </Link>
            <div className="mx-auto bg-green-400 w-0 group-hover:w-full h-[1px] transition-all duration-500"></div>
          </li>
        );
      })}
    </ul>
  );
};

export default NavbarLinks;
