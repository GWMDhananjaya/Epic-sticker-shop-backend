import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Need to register?{" "}
          <button
            type="button"
            onClick={() => navigate("/admin/register")}
            className="text-green-500 hover:underline"
          >
            Register Here
          </button>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
