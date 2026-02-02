import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    {/* Accessing the day from the payload */}
                    <p className='text-xs font-semibold text-purple-800 mb-1'>
                        {payload[0].payload.day}
                    </p>
                    <p className='text-sm text-gray-600'>
                        Amount: <span className='text-sm font-medium text-gray-900'>
                            ${payload[0].value}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='bg-white mt-6 w-full'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                    {/* FIXED: dataKey with capital 'K' */}
                    <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 10, fill: "#666" }} 
                        axisLine={false}
                        tickLine={false}
                        interval={2} 
                    />
                    
                    <YAxis 
                        tick={{ fontSize: 10, fill: "#666" }} 
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    
                    {/* FIXED: dataKey with capital 'K' and mapped to 'amount' */}
                    <Bar 
                        dataKey="amount" 
                        radius={[4, 4, 0, 0]}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomBarChart;