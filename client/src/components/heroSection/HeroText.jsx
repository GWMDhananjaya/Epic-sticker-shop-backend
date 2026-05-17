import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/framerMotion/variants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const HeroText = () => {
  const isMenuOpen = useSelector((state) => state.menu.menuOpen);
  const fullText = "Epic";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < fullText.length) {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="flex flex-col gap-4 h-full justify-center md:text-left sm:text-center">
      {/* ✅ Hide/show 'Epic' based on menuOpen state */}
      {!isMenuOpen && (
        <motion.h1
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0 }}
          className="md:text-[2.8rem] lg:hedden sm:text-5xl font-bold font-special text-gray-900 lg:text-gray-600 md:text-gray-600 font-mono"
        >
          <div className=" ">
            <span>{displayText}</span>
            <span className="animate-pulse text-gray-500">|</span>
          </div>
        </motion.h1>
      )}
      <div>
        <motion.h1
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0 }}
        ></motion.h1>
      </div>

      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="text-lg mt-0 sm:mb-5 text-white"
      >
        <h1 className="text-slate-500 font-bold text-6xl lg:text-6xl sm:text-3xl">
          Find your next perfect{" "}
          <span className="text-slate-400">modification</span>
          <br />
          with ease at Epic.
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm pt-2 pb-2">
          Epic is your go-to shop for vehicle modification parts and custom
          stickers,
          <br />
          offering a wide range of accessories to perfect your ride.
        </div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
          <a
            href="tel:+94715303304"
            className=" inline-block bg-green-300 hover:bg-green-400  drop-shadow-md  text-white font-semibold py-3 px-6 rounded-lg shadow-xl transition-all duration-300"
          >
            <p className="drop-shadow-md"> Call Our Hotline</p>
          </a>
        </motion.button>
      </motion.div>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Toggle popup */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-3 p-4 bg-white rounded-lg shadow-lg text-center"
          >
            <p className="text-sm mb-2 text-gray-800">
              Need help? Chat with us!
            </p>
            <a
              href="https://wa.me/+94767847059"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow transition"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        )}

        {/* WhatsApp icon button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
          aria-label="WhatsApp Chat"
        >
          <FaWhatsapp size={28} />
        </motion.button>
      </div>
    </div>
  );
};

export default HeroText;
