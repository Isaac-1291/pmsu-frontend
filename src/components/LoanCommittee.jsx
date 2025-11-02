import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaMoneyBillWave } from "react-icons/fa";

const LoanCommittee = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLoans = async () => {
    try {
      const response = await axios.get("https://pmsu-backend-1.onrender.com/api/loans");
      setLoans(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching loans:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const filteredLoans = loans.filter(
    (loan) =>
      loan.fullName.toLowerCase().includes(search.toLowerCase()) ||
      loan.staffId.toLowerCase().includes(search.toLowerCase()) ||
      loan.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-[#4a2c0a] flex items-center">
        <FaMoneyBillWave className="mr-2 text-[#7f4e1e]" /> Loan Committee Dashboard
      </h2>

      <div className="mb-4 flex items-center space-x-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search loans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#7f4e1e]"
        />
      </div>

      {loading ? (
        <p>Loading loans...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-[#f3e6da]">
              <tr>
                <th className="px-4 py-2 border">Full Name</th>
                <th className="px-4 py-2 border">Staff ID</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Amount Requested</th>
                <th className="px-4 py-2 border">Bank/Account</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Approval</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan._id} className="hover:bg-[#f9f0e6]">
                  <td className="px-4 py-2 border">{loan.fullName}</td>
                  <td className="px-4 py-2 border">{loan.staffId}</td>
                  <td className="px-4 py-2 border">{loan.department}</td>
                  <td className="px-4 py-2 border">{loan.amount}</td>
                  <td className="px-4 py-2 border">{loan.accountNumber} ({loan.bankName})</td>
                  <td className="px-4 py-2 border">{loan.duration}</td>
                  <td className="px-4 py-2 border">{loan.status}</td>
                  <td className="px-4 py-2 border">{loan.approval || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoanCommittee;