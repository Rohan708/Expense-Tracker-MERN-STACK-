import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            {/* 1. Added the missing Title */}
            <h5 className='text-lg font-semibold'>Recent Expenses</h5>
            
            <button className='card-btn flex items-center gap-1' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>

        <div className='mt-6'>
            {/* 2. Added a check for empty data */}
            {transactions && transactions.length > 0 ? (
                transactions.slice(0, 5).map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn
                    />
                ))
            ) : (
                // 3. Fallback UI so the card doesn't look empty
                <div className="text-center py-10 text-gray-400 text-sm">
                    No expense transactions found.
                </div>
            )}
        </div>
    </div>
  )
}

export default ExpenseTransactions