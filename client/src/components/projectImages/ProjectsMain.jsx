import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/framerMotion/variants";

import afterImg from "../../assets/images/4.jpg";
import img1 from "../../assets/images/2.jpg";
import img2 from "../../assets/images/1.jpg";
import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/6.jpg";
import img5 from "../../assets/images/7.jpg";
import img6 from "../../assets/images/9.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [afterImg, img1, img2, img3, img4, img5, img6];

const ProjectsMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-green-300 pb-7 ">
      <div className="px-4 max-w-[1200px] mx-auto mt-[110px]  ">
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
        >
          <div id="about" className="flex flex-col gap-12">
            <div className="mt-6">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                }}
                className="rounded-xl"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-60 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => openModal(img)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </motion.div>

        {/* Modal Viewer */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-full max-h-screen sm:w-3/4 md:w-1/2 lg:w-1/3">
              <img
                src={modalImage}
                alt="Full View"
                className="w-full h-auto object-contain rounded-lg"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded-full text-lg shadow"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsMain;
