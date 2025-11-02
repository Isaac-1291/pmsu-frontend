import { useState } from "react";

const AdminLogin = ({ isAdmin, setIsAdmin }) => {
  const [password, setPassword] = useState("");
  const ADMIN_PASSWORD = "Admin@2025"; // admin password

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setPassword("");
      alert("Admin logged in successfully!");
    } else {
      alert("Incorrect password!");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {!isAdmin ? (
        <>
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-1 rounded text-black"
          />
          <button
            onClick={handleLogin}
            className="bg-[#00264d] px-3 py-1 rounded hover:bg-[#004080]"
          >
            Login
          </button>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-[#00264d] px-3 py-1 rounded hover:bg-[#004080]"
        >
          Logout Admin
        </button>
      )}
    </div>
  );
};

export default AdminLogin;