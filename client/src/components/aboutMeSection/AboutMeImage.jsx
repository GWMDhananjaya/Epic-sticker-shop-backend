import React from "react";
import about_image from "../../assets/images/about.png";

const AboutMeImage = () => {
  return (
    <div className="h-[500px] w-[300px] relative">
      <div className="h-[500px] w-[300px] rounded-[1000px] absolute overflow-hidden">
        <img
          src={about_image}
          alt="about me image"
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="h-[300px] w-[250px] bg-green-400 absolute bottom-[-30px] left-[-30px] rounded-tr-[120px] rounded-bl-[170px] rounded-tl-[20px] rounded-br-[20px] -z-10"></div>
    </div>
  );
};

export default AboutMeImage;
