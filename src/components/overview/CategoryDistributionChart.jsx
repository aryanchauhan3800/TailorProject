import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const categoryData = [
	{ name: "Electronics", value: 4500 },
	{ name: "Clothing", value: 3200 },
	{ name: "Home & Garden", value: 2800 },
	{ name: "Books", value: 2100 },
	{ name: "Sports & Outdoors", value: 1900 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];
const GRAY_COLOR = "#D1D5DB"; // Grey color for non-highlighted categories

const CategoryDistributionChart = () => {
	const [selectedCategory, setSelectedCategory] = useState("All");

	// Function to handle category filter selection
	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
	};

	// Function to determine the fill color of each category
	const getFillColor = (categoryName, index) => {
		if (selectedCategory === "All" || selectedCategory === categoryName) {
			return COLORS[index % COLORS.length]; // Use normal colors
		} else {
			return GRAY_COLOR; // Grey out non-selected categories
		}
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-lg font-medium text-gray-100'>Category Distribution</h2>

				{/* Dropdown for filtering categories */}
				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={selectedCategory}
					onChange={handleCategoryChange}
				>
					<option value="All">All</option>
					{categoryData.map((category) => (
						<option key={category.name} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart>
						<Pie
							data={categoryData}
							cx={"50%"}
							cy={"50%"}
							labelLine={false}
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{categoryData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={getFillColor(entry.name, index)} // Apply color based on selection
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

export default CategoryDistributionChart;
