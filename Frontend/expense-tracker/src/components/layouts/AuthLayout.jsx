import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-4 bg-white p-5 rounded-xl shadow-xl border border-gray-200 z-20 w-[260px]">
      <div className={`w-12 h-12 flex items-center justify-center text-[24px] text-white ${color} rounded-full drop-shadow-lg`}>
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-xl font-semibold text-gray-900">${value}</span>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex">
      
      {/* Left Form Section */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 flex flex-col justify-center">
        <h2 className="text-lg font-medium text-black mb-10">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Visual Section */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">

        {/* Purple Background Decorative Shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-6 z-0" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-8 z-0" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 left-4 z-0" />

        {/* Stats Card Overlapping Purple */}
        <div className="absolute top-10 left-10 z-20">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        {/* Card/Chart Image */}
        <img
          src={CARD_2}
          className="w-[90%] absolute bottom-8 left-8 shadow-xl shadow-blue-400/15"
          alt="Card"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
export { StatsInfoCard };
