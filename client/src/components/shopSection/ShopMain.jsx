import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../framerMotion/variants";
import axios from "axios";

const ShopMain = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <section id="shop" className="px-4 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Shop</h2>
          <p className="text-gray-600">Discover our amazing products</p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeIn("up", 0.1 * index)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {product.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      {product.price}
                    </span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopMain;
