import React from 'react';
import moment from 'moment';
import { LuArrowRight } from "react-icons/lu";
// Ensure this import name matches exactly what you use below
import TransactionInfoCard from '../Cards/TransactionInfoCard'; 

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
        <div className='flex items-center justify-between'>
            {/* Fixed typo in "Income" */}
            <h5 className='text-lg font-semibold text-gray-800'>Recent Income</h5>
            <button className='card-btn flex items-center gap-1' onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
            </button>
        </div>
        
        <div className='mt-6'>
            {transactions?.length > 0 ? (
                transactions.slice(0, 5).map((item) => (
                    // FIXED: Removed the 's' to match the singular import
                    <TransactionInfoCard 
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type="income"
                        hideDeleteBtn
                    />
                ))
            ) : (
                <div className="text-center py-10 text-gray-400 text-sm">
                    No recent income found.
                </div>
            )}
        </div>
    </div>
  );
};

export default RecentIncome;