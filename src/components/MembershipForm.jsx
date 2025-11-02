import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaIdBadge, FaBuilding, FaBriefcase, FaPhone, FaEnvelope, FaToggleOn } from "react-icons/fa";
import logo from "../assets/cmc_logo.jpg";

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
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    "WPO", "Shipping", "Marketing", "Human Resource", "Accounts",
    "Audit", "Information System", "Monitoring & Evaluation",
    "Risk", "Procurement", "Legal", "Estate"
  ];

  // Fetch members on mount
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

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        fullName: "",
        staffId: "",
        department: "",
        position: "",
        phone: "",
        email: "",
        status: "Active",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting form: " + (error.response?.data?.message || error.message));
    }
  };

  // Filter members for search
  const filteredMembers = members.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#8B4513] flex flex-col items-center p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 mb-8 text-center">
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="CMC Logo" className="h-20 w-20 object-contain mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            PROFESSIONAL AND MANAGERIAL STAFF UNION (PMSU) - CMC
          </h1>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Membership Registration</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center space-x-2">
            <FaUser className="text-[#8B4513]" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            />
          </div>

          {/* Staff ID */}
          <div className="flex items-center space-x-2">
            <FaIdBadge className="text-[#8B4513]" />
            <input
              type="text"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              placeholder="Staff ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            />
          </div>

          {/* Department */}
          <div className="flex items-center space-x-2">
            <FaBuilding className="text-[#8B4513]" />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Position */}
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-[#8B4513]" />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-2">
            <FaPhone className="text-[#8B4513]" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-[#8B4513]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            />
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <FaToggleOn className="text-[#8B4513]" />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white py-2 rounded-lg hover:bg-[#8B4513] transition-colors font-semibold"
          >
            Register
          </button>
        </form>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Registered Members</h2>
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
          />
        </div>
        {loading ? (
          <p>Loading members...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Full Name</th>
                  <th className="px-4 py-2 border">Staff ID</th>
                  <th className="px-4 py-2 border">Department</th>
                  <th className="px-4 py-2 border">Position</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member._id}>
                    <td className="px-4 py-2 border">{member.fullName}</td>
                    <td className="px-4 py-2 border">{member.staffId}</td>
                    <td className="px-4 py-2 border">{member.department}</td>
                    <td className="px-4 py-2 border">{member.position}</td>
                    <td className="px-4 py-2 border">{member.phone}</td>
                    <td className="px-4 py-2 border">{member.email}</td>
                    <td className="px-4 py-2 border">{member.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipForm;