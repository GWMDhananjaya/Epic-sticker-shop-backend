import { motion } from "framer-motion";
import { fadeIn } from "../../components/framerMotion/variants";
import React from "react";

const WhatsAppContactSection = () => {
  return (
    <section id="contact" className="px-4 py-12 bg-green-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h2>

        {/* WhatsApp Contact Button */}
        <div className="flex justify-center items-center">
          <div className="w-full md:w-1/2 text-center">
            <p className="text-lg font-semibold text-gray-700 mb-4 font-bold">
              Need to book an appointment? Send us a message on WhatsApp!
            </p>
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
            >
              <a
                href="https://wa.me/+94767847059"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
              >
                Chat with Us on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppContactSection;
