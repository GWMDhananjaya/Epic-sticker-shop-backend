import React from "react";
// import { FaCentercode } from "react-icons/fa";
import Mainpic from "../../assets/images/main.jpg";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/framerMotion/variants";

const HeroPic = () => {
  return (
    <motion.div
      variants={fadeIn("left", 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amout: 0 }}
      className="h-full flex item-center justify-center"
    >
      <img
        id="home"
        src={Mainpic}
        alt="dhananjaya image"
        className="lg:max-h-[350px] xl:max-h-[450px] sm:max-h-[300px] w-auto rounded-full shadow-black shadow-2xl object-cover object-center"
      />
      {/* <div className="absolute -z-10 flex justify-center items-center animate-pulse ">
        <FaCentercode className="md:h-[90%] sm:h-[120%] min-h-[360px] w-auto text-cyan blur-md animate-[spin_20s_linear_infinite]" />
      </div> */}
    </motion.div>
  );
};

export default HeroPic;
