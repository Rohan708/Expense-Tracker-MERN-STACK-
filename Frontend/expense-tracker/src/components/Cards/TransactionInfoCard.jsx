import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete
}) => {
    
    // FIXED: Added 'return' keyword so the classes are actually applied
    const getAmountStyles = () => {
        return type === "income" 
            ? "bg-green-50 text-green-500" 
            : "bg-red-50 text-red-500";
    }

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 transition-colors">
      {/* Icon Section */}
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className='flex-1 flex items-center justify-between'>
        <div>
            <p className='text-sm text-gray-700 font-medium capitalize'>{title}</p>
            <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>

        <div className='flex items-center gap-3'>
            {/* Delete Button: Logic remains same, but fixed opacity syntax */}
            {!hideDeleteBtn && (
                <button 
                  className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity' 
                  onClick={onDelete}
                >
                    <LuTrash2 size={18} />
                </button>
            )}

            {/* Amount Badge */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                <h6 className='text-xs font-semibold'>
                    {/* Fixed underscore to minus sign for expenses */}
                    {type === "income" ? "+" : "-"} ${amount}
                </h6>
                {type === "income" ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
            </div> 
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;