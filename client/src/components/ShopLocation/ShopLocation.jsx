import { motion } from "framer-motion";
import { fadeIn } from "../../components/framerMotion/variants";

export default function ShopLocationSection() {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
    >
      <section id="Location" className="px-4 py-8  mb-[110px] mt-[110px]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Text Section */}

          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Shop Location
            </h2>
            <p className="text-gray-700 text-base md:text-lg font-bold">
              We specialize in custom vehicle modifications and stylish stickers
              to make your ride stand out! Located conveniently near the Post
              Office in Ginigathena.
            </p>
            <div className="mt-4 text-sm text-gray-600">
              Open Monday to Saturday, 9:00 AM – 6:00 PM 🕘
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Hatton Road, Ginigathena, Sri Lanka
            </div>
            {/* Get Directions Button */}
            <div className="mt-6">
              <a
                href="https://maps.app.goo.gl/pQQgo3dUNvpNJguf9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-base font-semibold py-2 px-4 rounded-xl shadow-md transition"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Map Section */}

          <div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-xl border">
            <iframe
              title="Shop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.0509367964787!2d80.4934385746627!3d6.987038593013953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae39fd7d031b871%3A0x84c2e689f3edc0b8!2sEpic%20auto%20detailing!5e1!3m2!1sen!2slk!4v1775809228555!5m2!1sen!2slk"
              height="300"
              className="w-full h-64 md:h-80 border-none"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
