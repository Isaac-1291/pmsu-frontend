import React from "react";
import MembershipForm from "./components/MembershipForm";
import logo from "./assets/cmc_logo.jpg";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4B2E2E] via-[#D9B38C] to-[#FFF3E0] flex flex-col items-center p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center md:justify-center mb-8 space-y-4 md:space-y-0 md:space-x-6">
        <img src={logo} alt="CMC Logo" className="h-20 w-20 object-contain" />
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">
          PROFESSIONAL AND MANAGERIAL STAFF UNION (PMSU) - CMC
        </h1>
      </header>

      {/* Membership Form */}
      <MembershipForm />
      
      {/* Footer */}
      <footer className="mt-12 text-[#3E2C2C] text-sm">
        © {new Date().getFullYear()} Cocoa Marketing Company | PMSU
      </footer>
    </div>
  );
}

export default App;