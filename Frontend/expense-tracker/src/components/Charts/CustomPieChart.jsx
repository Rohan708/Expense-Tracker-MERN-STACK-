import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"; // Added missing 'from "recharts"' and curly brace
import CustomTooltip from "../Charts/CustomTooltip";
import CustomLegend from './CustomLegend';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          paddingAngle={5} // Optional: adds spacing between slices
        >
          {data.map((entry, index) => ( // Fixed .map syntax and index typo
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} // Fixed colors.length check
            />
          ))}
        </Pie>
        
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend}/>

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle" // Fixed 'mid' to 'middle'
              fill="#666"
              style={{ fontSize: "14px" }} // Best practice for font size in SVG
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={15} // Adjusted spacing for better alignment
              textAnchor="middle"
              fill="#333"
              style={{ fontSize: "24px", fontWeight: "600" }} // Fixed 'semi-bold'
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;