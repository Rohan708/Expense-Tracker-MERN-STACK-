import React, { useEffect, useState } from 'react'; // Added useState import
import { prepareExpenseBarChartData } from "../../utils/helper"; // Ensure this path is correct for your project
import CustomBarChart from "../Charts/CustomBarChart";
const Last30DaysExpenses = ({ data }) => { // Capitalized the component name
  const [chartData, setChartData] = useState([]); // Fixed typo: setCharData -> setChartData

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
      
      {/* This is where your BarChart component will go next */}
      <div className="h-[300px] flex items-center justify-center text-gray-400">
        {chartData.length > 0 ? "Chart Ready to Render" : "No data available for the last 30 days"}
      </div>
      <CustomBarChart data={chartData} 
      />
    </div>
  );
};

export default Last30DaysExpenses;