import { FaUser, FaMoneyBill, FaClipboardList, FaUsers, FaUserShield } from "react-icons/fa";

const Navbar = ({ currentPage, setCurrentPage, isAdmin }) => {
  return (
    <nav className="bg-[#4a2c0a] text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4 font-bold text-lg">
        <span className="cursor-pointer" onClick={() => setCurrentPage("membership")}>
          <FaUser className="inline mr-1" /> Membership Form
        </span>
        <span className="cursor-pointer" onClick={() => setCurrentPage("loan")}>
          <FaMoneyBill className="inline mr-1" /> Loan Form
        </span>
        {isAdmin && (
          <>
            <span className="cursor-pointer" onClick={() => setCurrentPage("committee")}>
              <FaClipboardList className="inline mr-1" /> Loan Committee
            </span>
            <span className="cursor-pointer" onClick={() => setCurrentPage("members")}>
              <FaUsers className="inline mr-1" /> Registered Members
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;