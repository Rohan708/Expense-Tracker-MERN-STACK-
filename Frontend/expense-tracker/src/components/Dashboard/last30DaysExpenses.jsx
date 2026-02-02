import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      const result = prepareExpenseBarChartData(data);
      setChartData(result);
    }
  }, [data]);

  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg font-semibold'>Last 30 Days Expenses</h5>
      </div>
      
      <div className="h-[300px] w-full">
        {chartData.length > 0 ? (
          // If we have data, show the actual chart
          <CustomBarChart data={chartData} />
        ) : (
          // If no data, show the empty state message
          <div className="h-full flex items-center justify-center text-gray-400">
            No data available for the last 30 days
          </div>
        )}
      </div>
    </div>
  );
};

export default Last30DaysExpenses;