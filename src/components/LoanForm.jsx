import { useState } from "react";
import axios from "axios";
import { 
  FaUser, FaUniversity, FaMoneyBill, FaCalendarAlt, FaBuilding, FaMobileAlt, FaIdCard 
} from "react-icons/fa";
import logo from "../assets/cmc_logo.jpg";

const LoanForm = ({ isAdmin = false, showNotifications = false }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    staffId: "",
    amount: "",
    bankAccount: "",
    bankName: "",
    mobileMoney: "",
    duration: "",
    department: "",
    centre: "",
    status: "Pending",
    committeeNotes: "",
    approval: "",
  });

  const departments = [
    "WPO", "Shipping", "Marketing", "Human Resource", "Accounts",
    "Audit", "Information System", "Monitoring & Evaluation", "Risk",
    "Procurement", "Legal", "Estate"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://pmsu-backend-1.onrender.com/api/loans",
        formData
      );

      // Send email notification to applicant if admin updates loan
      if (isAdmin && formData.approval !== "Pending") {
        await axios.post(
          "https://pmsu-backend-1.onrender.com/api/notifications/loan",
          {
            fullName: formData.fullName,
            email: formData.email,
            status: formData.approval,
          }
        );
      }

      alert(isAdmin ? "Loan updated successfully and applicant notified!" : "Loan application submitted successfully!");
      setFormData({
        fullName: "",
        nationalId: "",
        staffId: "",
        amount: "",
        bankAccount: "",
        bankName: "",
        mobileMoney: "",
        duration: "",
        department: "",
        centre: "",
        status: "Pending",
        committeeNotes: "",
        approval: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <img src={logo} alt="CMC Logo" className="h-16 w-16 object-contain" />
        <h2 className="text-xl md:text-2xl font-bold text-[#4a2c0a]">
          PROFESSIONAL AND MANAGERIAL STAFF UNION (PMSU) - CMC
        </h2>
      </div>

      <h3 className="text-lg font-semibold mb-4 text-[#7f4e1e] flex items-center space-x-2">
        <FaMoneyBill /> {isAdmin ? "Loan Committee Review" : "Loan Application Form"}
      </h3>

      {showNotifications && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
          🔔 You have pending loan or membership notifications
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isAdmin && (
          <>
            {/* Applicant Section */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <FaUser className="inline mr-1"/> Full Name
              </label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <FaIdCard className="inline mr-1"/> National ID
              </label>
              <input type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <FaUser className="inline mr-1"/> Staff ID
              </label>
              <input type="text" name="staffId" value={formData.staffId} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <FaMoneyBill className="inline mr-1"/> Amount Requested (GH₵)
              </label>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <FaUniversity className="inline mr-1"/> Bank / Account Number
              </label>
              <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
              <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name / Branch" className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <FaMobileAlt className="inline mr-1"/> Mobile Money Number
              </label>
              <input type="text" name="mobileMoney" value={formData.mobileMoney} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <FaCalendarAlt className="inline mr-1"/> Duration
              </label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <FaBuilding className="inline mr-1"/> Department
              </label>
              <select name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]">
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                <FaBuilding className="inline mr-1"/> Centre
              </label>
              <input type="text" name="centre" value={formData.centre} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
            </div>

            <button type="submit" className="w-full bg-[#4a2c0a] text-white py-2 rounded-lg font-semibold hover:bg-[#7f4e1e]">
              Submit Application
            </button>
          </>
        )}

        {/* Admin Section */}
        {isAdmin && (
          <>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Committee Notes</label>
              <textarea name="committeeNotes" value={formData.committeeNotes} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]" />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">Approval Status</label>
              <select name="approval" value={formData.approval} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7f4e1e]">
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-[#4a2c0a] text-white py-2 rounded-lg font-semibold hover:bg-[#7f4e1e]">
              Update Loan
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoanForm;