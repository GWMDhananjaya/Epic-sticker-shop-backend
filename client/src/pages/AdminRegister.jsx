import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/register", {
        username,
        password,
      });
      setMessage("Admin created successfully! You can now login.");
      setTimeout(() => navigate("/admin/epicnuwan"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Admin Registration</h2>
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/admin/epicnuwan")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;
