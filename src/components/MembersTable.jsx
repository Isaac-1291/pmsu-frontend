import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaUser } from "react-icons/fa";

const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filteredMembers = members.filter(
    (m) =>
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.staffId.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-[#4a2c0a] flex items-center">
        <FaUser className="mr-2 text-[#7f4e1e]" /> Registered Members
      </h2>

      <div className="mb-4 flex items-center space-x-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#7f4e1e]"
        />
      </div>

      {loading ? (
        <p>Loading members...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-[#f3e6da]">
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
                <tr key={member._id} className="hover:bg-[#f9f0e6]">
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
  );
};

export default MembersTable;