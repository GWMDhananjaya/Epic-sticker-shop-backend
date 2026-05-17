import { Link } from "react-scroll";
import logo from "../../assets/images/logo.png";

const FooterMain = () => {
  const footerLinks = [
    {
      name: "About Us",
      section: "about",
    },

    {
      name: "Location",
      section: "Location",
    },
    {
      name: "Contact",
      section: "contact",
    },
  ];
  return (
    <div className="px-4 bg-green-200 mb-3">
      <div className="md:flex justify-between mt-4 max-w-[1200px] mx-auto sm:hidden">
        <Link
          to="home"
          smooth={true}
          spy={true}
          duration={500}
          offset={-200}
          className="cursor-pointer"
        >
          <div className="text-2xl text-gray-700 font-bold">
            Epic Auto Detailing
          </div>
        </Link>
        <ul className="flex gap-4 text-lightGrey text-xl">
          {footerLinks.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-120}
                  to={item.section}
                  className="hover:text-gray-700 transition-all duration-500 cursor-pointer"
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full h-[1px] bg-lightGrey mt-2"></div>
      <p className="max-w-[1200px] mx-auto text-right mt-2  text-sm text-lightBrown">
        © 2026 DHANANJAYA | All Rights Reserved.
      </p>
    </div>
  );
};

export default FooterMain;
