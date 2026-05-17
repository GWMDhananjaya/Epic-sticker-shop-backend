import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../components/state/menuSlice";

const NavbarToggler = () => {
  const dispatch = useDispatch();

  const setToggleMenu = () => {
    dispatch(toggleMenu());
  };
  return (
    <button
      className="text-2xl p-2 border border-gray-800 rounded-full text-gray-700 cursor-pointer"
      onClick={setToggleMenu}
    >
      <GiHamburgerMenu />
    </button>
  );
};

export default NavbarToggler;
