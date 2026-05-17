import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    name: "",
    align: "left",
    image: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", formData);
      alert("Product added!");
      setFormData({
        name: "",
        align: "left",
        image: "",
        description: "",
        price: "",
      });
    } catch (err) {
      alert("Error adding product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-gray-100 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mb-2 p-2 w-full"
      />
      <select
        name="align"
        value={formData.align}
        onChange={handleChange}
        className="mb-2 p-2 w-full"
      >
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="mb-2 p-2 w-full"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="mb-2 p-2 w-full"
      />
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="mb-2 p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default AdminPanel;
