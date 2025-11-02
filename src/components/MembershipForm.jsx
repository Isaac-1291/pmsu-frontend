import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/cmc_logo.jpg";

// Import icons
import { FaUser, FaIdBadge, FaBuilding, FaBriefcase, FaPhone, FaEnvelope, FaCheckCircle } from "react-icons/fa";

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    staffId: "",
    department: "",
    position: "",
    phone: "",
    email: "",
    status: "Active",
  });

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const departments = [
    "WPO","Shipping","Marketing","Human Resource","Accounts","Audit",
    "Information System","Monitoring & Evaluation","Risk","Procurement",
    "Legal","Estate"
  ];

  const fetchMembers = async () => {
    try {
      const response = await axios.get("https://pmsu-backend-1.onrender.com/api/members");
      setMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching members:", error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://pmsu-backend-1.onrender.com/api/members",
        formData
      );
      alert("Member registered successfully!");
      setMembers([...members, response.data.member]);
      setFormData({
        fullName: "", staffId: "", department: "", position: "",
        phone: "", email: "", status: "Active",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting form: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f0e6] p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 mx-auto mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <img src={logo} alt="CMC Logo" className="h-16 w-16 object-contain" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            PROFESSIONAL AND MANAGERIAL STAFF UNION (PMSU) - CMC
          </h1>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-gray-700">Membership Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#7f4e1e]">
            <FaUser className="text-[#7f4e1e] mr-2" />
            <input
              type="text" name="fullName" placeholder="Full Name"
              value={formData.fullName} onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Staff ID */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#7f4e1e]">
            <FaIdBadge className="text-[#7f4e1e] mr-2" />
            <input
              type="text" name="staffId" placeholder="Staff ID"
              value={formData.staffId} onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Department */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#7f4e1e]">
            <FaBuilding className="text-[#7f4e1e] mr-2" />
            <select
              name="department" value={formData.department} onChange={handleChange}
              className="w-full outline-none bg-transparent"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>

          {/* Position */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#7f4e1e]">
            <FaBriefcase className="text-[#7f4e1e] mr-2" />
            <input
              type="text" name="position" placeholder="Position"
              value={formData.position} onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#7f4e1e]">
            <FaPhone className="text-[#7f4e1e] mr-2" />
            <input
              type="tel" name="phone" placeholder="Phone"
              value={formData.phone} onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#7f4e1e]">
            <FaEnvelope className="text-[#7f4e1e] mr-2" />
            <input
              type="email" name="email" placeholder="Email"
              value={formData.email} onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Status */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#7f4e1e]">
            <FaCheckCircle className="text-[#7f4e1e] mr-2" />
            <select
              name="status" value={formData.status} onChange={handleChange}
              className="w-full outline-none bg-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button className="w-full bg-[#7f4e1e] text-white py-2 rounded-lg hover:bg-[#5b3919] transition-colors font-semibold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default MembershipForm;