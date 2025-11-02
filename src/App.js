import { useState } from "react";
import logo from "./assets/cmc_logo.jpg";
import Notifications from "./components/Notifications";
import AdminLogin from "./components/AdminLogin";
import MembershipForm from "./components/MembershipForm";
import LoanForm from "./components/LoanForm";
import LoanCommittee from "./components/LoanCommittee";
import MembersTable from "./components/MembersTable";

function App() {
  const [activeTab, setActiveTab] = useState("membership"); // default tab
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f0eb]"> {/* CMC background color */}
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-[#4a2c0a] text-white">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="CMC Logo" className="h-12 w-12 object-contain" />
          <h1 className="text-xl font-bold">PMSU System</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Notifications />
          <AdminLogin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        </div>
      </header>

      {/* Menu Tabs */}
      <nav className="bg-[#7f4e1e] p-2 text-white flex justify-center space-x-4">
        <button onClick={() => setActiveTab("membership")} className="hover:underline">
          Membership Form
        </button>
        <button onClick={() => setActiveTab("loan")} className="hover:underline">
          Loan Form
        </button>
        {isAdmin && (
          <>
            <button onClick={() => setActiveTab("loanCommittee")} className="hover:underline">
              Loan Committee
            </button>
            <button onClick={() => setActiveTab("membersTable")} className="hover:underline">
              Registered Members
            </button>
          </>
        )}
      </nav>

      {/* Content */}
      <main className="p-4">
        {activeTab === "membership" && <MembershipForm />}
        {activeTab === "loan" && <LoanForm isAdmin={isAdmin} />}
        {activeTab === "loanCommittee" && isAdmin && <LoanCommittee />}
        {activeTab === "membersTable" && isAdmin && <MembersTable />}
      </main>
    </div>
  );
}

export default App;