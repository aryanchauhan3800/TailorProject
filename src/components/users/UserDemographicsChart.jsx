import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];
const GRAY = "#d1d5db"; // Gray color for non-selected segments

const userDemographicsData = [
	{ name: "18-24", value: 20 },
	{ name: "25-34", value: 30 },
	{ name: "35-44", value: 25 },
	{ name: "45-54", value: 15 },
	{ name: "55+", value: 10 },
];

const UserDemographicsChart = () => {
	const [selectedAgeGroup, setSelectedAgeGroup] = useState("All");

	// Handle age group selection
	const handleAgeGroupChange = (e) => {
		setSelectedAgeGroup(e.target.value);
	};

	// Filter data based on selected age group
	const filteredData = selectedAgeGroup === "All"
		? userDemographicsData
		: userDemographicsData.filter(data => data.name === selectedAgeGroup);

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 lg:col-span-2'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>User Demographics</h2>
			<div className='flex items-center mb-4'>
				<span className='text-gray-100 mr-3'>Filter by age group:</span>
				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={selectedAgeGroup}
					onChange={handleAgeGroupChange}
				>
					<option value="All">All</option>
					{userDemographicsData.map(data => (
						<option key={data.name} value={data.name}>
							{data.name}
						</option>
					))}
				</select>
			</div>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={userDemographicsData} // Use original data here
							cx='50%'
							cy='50%'
							outerRadius={100}
							dataKey='value'
							label={({ name, percent }) => `Age Group: ${name} ${(percent * 100).toFixed(0)}%`}
						>
							{userDemographicsData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={filteredData.some(data => data.name === entry.name) 
										? COLORS[index % COLORS.length] 
										: GRAY}
								/>
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default UserDemographicsChart;
