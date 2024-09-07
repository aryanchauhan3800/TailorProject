import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

// Dummy data for sales
const yearlySalesData = [
	{ name: "Jul", sales: 4200 },
	{ name: "Aug", sales: 3800 },
	{ name: "Sep", sales: 5100 },
	{ name: "Oct", sales: 4600 },
	{ name: "Nov", sales: 5400 },
	{ name: "Dec", sales: 7200 },
	{ name: "Jan", sales: 6100 },
	{ name: "Feb", sales: 5900 },
	{ name: "Mar", sales: 6800 },
	{ name: "Apr", sales: 6300 },
	{ name: "May", sales: 7100 },
	{ name: "Jun", sales: 7500 },
];

// Dummy weekly data
const weeklySalesData = [
	{ name: "Mon", sales: 1000 },
	{ name: "Tue", sales: 1200 },
	{ name: "Wed", sales: 800 },
	{ name: "Thu", sales: 1500 },
	{ name: "Fri", sales: 1700 },
	{ name: "Sat", sales: 1300 },
	{ name: "Sun", sales: 1600 },
];

// Quarterly sales data
const quarterlySalesData = [
	{ name: "Q1", sales: 18000 },
	{ name: "Q2", sales: 21000 },
	{ name: "Q3", sales: 22500 },
	{ name: "Q4", sales: 24000 },
];

const SalesOverviewChart = () => {
	// State for selecting time range
	const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

	// Function to get filtered data based on time range
	const getFilteredData = () => {
		if (selectedTimeRange === "This Week") {
			return weeklySalesData;
		} else if (selectedTimeRange === "This Quarter") {
			return quarterlySalesData;
		} else if (selectedTimeRange === "This Year") {
			return yearlySalesData;
		} else {
			// Default to showing monthly data
			return yearlySalesData;
		}
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-lg font-medium text-gray-100'>Sales Overview</h2>

				{/* Dropdown for selecting time range */}
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

			{/* Line Chart */}
			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={getFilteredData()}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={"name"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='sales'
							stroke='#6366F1'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesOverviewChart;
