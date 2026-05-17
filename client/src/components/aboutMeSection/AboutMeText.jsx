import React from "react";

const AboutMeText = () => {
  return (
    <div className="flex flex-col md:items-start sm:items-center md:text-left sm:text-center">
      <div className="py-2 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">About Us</h2>
        <p className="mb-4 text-slate-700 font-bold ">
          Welcome to Epic, your ultimate destination for high-quality vehicle
          modification parts and custom stickers. We specialize in offering a
          wide range of accessories to enhance your ride, from performance
          upgrades to unique decals. Our mission is to provide top-notch
          products and excellent customer service, helping you find the perfect
          fit for your vehicle with ease.
        </p>
        <p className="mb-4 text-slate-500 font-bold">
          Take your ride to the next level with Epic !
        </p>
      </div>
    </div>
  );
};

export default AboutMeText;
