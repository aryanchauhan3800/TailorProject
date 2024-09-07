import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Example revenue data for different time ranges
const revenueData = {
	"This Week": [
		{ day: "Mon", revenue: 1000, target: 950 },
		{ day: "Tue", revenue: 1200, target: 1150 },
		{ day: "Wed", revenue: 800, target: 850 },
		{ day: "Thu", revenue: 950, target: 1000 },
		{ day: "Fri", revenue: 1100, target: 1050 },
		{ day: "Sat", revenue: 1300, target: 1200 },
		{ day: "Sun", revenue: 1400, target: 1300 },
	],
	"This Month": [
		{ month: "Jan", revenue: 4000, target: 3800 },
		{ month: "Feb", revenue: 3000, target: 3200 },
		{ month: "Mar", revenue: 5000, target: 4500 },
		{ month: "Apr", revenue: 4500, target: 4200 },
		{ month: "May", revenue: 6000, target: 5500 },
		{ month: "Jun", revenue: 5500, target: 5800 },
		{ month: "Jul", revenue: 7000, target: 6500 },
	],
	"This Quarter": [
		{ quarter: "Q1", revenue: 15000, target: 14000 },
		{ quarter: "Q2", revenue: 16000, target: 15000 },
		{ quarter: "Q3", revenue: 17000, target: 16000 },
		{ quarter: "Q4", revenue: 18000, target: 17000 },
	],
	"This Year": [
		{ year: "2023", revenue: 70000, target: 65000 },
	],
};

const RevenueChart = () => {
	const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

	// Filter data based on the selected time range
	const data = revenueData[selectedTimeRange] || [];

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Revenue vs Target</h2>
				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={selectedTimeRange}
					onChange={(e) => setSelectedTimeRange(e.target.value)}
				>
					<option>This Week</option>
					<option>This Month</option>
					<option>This Quarter</option>
					<option>This Year</option>
				</select>
			</div>

			<div style={{ width: "100%", height: 400 }}>
				<ResponsiveContainer>
					<AreaChart data={data}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey={selectedTimeRange === "This Week" ? 'day' : selectedTimeRange === "This Quarter" ? 'quarter' : 'month'} stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Area type='monotone' dataKey='revenue' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.3} />
						<Area type='monotone' dataKey='target' stroke='#10B981' fill='#10B981' fillOpacity={0.3} />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default RevenueChart;
