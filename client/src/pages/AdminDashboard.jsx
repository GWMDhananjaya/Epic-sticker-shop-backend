import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    align: "left",
    description: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/epicnuwan");
      return;
    }
    fetchProducts();
  }, [token, navigate]);

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    setUploading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("align", formData.align);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", imageFile);

    try {
      await axios.post("http://localhost:5000/api/products", formDataToSend, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");
      setFormData({
        name: "",
        align: "left",
        description: "",
        price: "",
      });
      setImageFile(null);
      setImagePreview("");
      fetchProducts();
    } catch (err) {
      alert(
        "Error adding product: " + (err.response?.data?.msg || err.message),
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: token },
        });
        alert("Product deleted!");
        fetchProducts();
      } catch (err) {
        alert("Error deleting product");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/epicnuwan");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Alignment</label>
                <select
                  name="align"
                  value={formData.align}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Product Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!imageFile}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded"
                    />
                    <p className="text-sm text-gray-500 mt-1">Preview</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price *</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price (e.g., $49.99)"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
              >
                {uploading ? "Uploading..." : "Add Product"}
              </button>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Current Products</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.length === 0 ? (
                <p className="text-gray-500 text-center">No products yet</p>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {product.description}
                        </p>
                        <p className="text-green-600 font-bold mt-2">
                          {product.price}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Added:{" "}
                          {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {product.image && (
                        <img
                          src={`http://localhost:5000${product.image}`}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded ml-4"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="mt-3 text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
