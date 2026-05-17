import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../state/menuSlice"; // Make sure this path is correct

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarBtn from "./NavbarBtn";
import NavbarToggler from "./NavbarToggler";

const NavbarMain = () => {
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  const dispatch = useDispatch();
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        dispatch(closeMenu());
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, dispatch]);

  return (
    <nav
      ref={navRef}
      className=" opacity-100 max-w-[1300px] mx-auto w-full px-4 translate-x-[0%] z-20 flex gap-4 mt-5"
    >
      <div className="flex justify-between w-full max-w-[1200px] mx-auto bg-black items-center p-3 rounded-r-full rounded-l-full border-b-green-400 border-[5px] ">
        <NavbarLogo />
        <div className={`${menuOpen ? "sm:block" : "sm:hidden"} lg:block`}>
          <NavbarLinks />
        </div>
        <NavbarBtn />
      </div>
      <div className="flex lg:hidden sm:block p-6  items-center justify-center rounded-full ">
        <NavbarToggler />
      </div>
    </nav>
  );
};

export default NavbarMain;
