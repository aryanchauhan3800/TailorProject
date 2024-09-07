import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Example data structure for Line chart with months
const userGrowthData = [
	{ name: "Jan", users: 1000 },
	{ name: "Feb", users: 1500 },
	{ name: "Mar", users: 2000 },
	{ name: "Apr", users: 3000 },
	{ name: "May", users: 4000 },
	{ name: "Jun", users: 5000 },
];

const UserGrowthChart = () => {
	const [selectedMonth, setSelectedMonth] = useState("All");

	// Function to handle month filter selection
	const handleMonthChange = (e) => {
		setSelectedMonth(e.target.value);
	};

	// Filter data based on selected month
	const filteredData = selectedMonth === "All"
		? userGrowthData
		: userGrowthData.filter(data => data.name === selectedMonth);

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-semibold text-gray-100'>User Growth</h2>

				{/* Dropdown for filtering by month */}
				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={selectedMonth}
					onChange={handleMonthChange}
				>
					<option value="All">All</option>
					{userGrowthData.map(data => (
						<option key={data.name} value={data.name}>
							{data.name}
						</option>
					))}
				</select>
			</div>

			<div className='h-[320px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<LineChart data={filteredData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='users'
							stroke='#8B5CF6'
							strokeWidth={2}
							dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default UserGrowthChart;
