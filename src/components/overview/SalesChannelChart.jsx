import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];
const GRAY_COLOR = "#D1D5DB"; // Grey color for non-highlighted channels

const SALES_CHANNEL_DATA = [
	{ name: "Website", value: 45600 },
	{ name: "Mobile App", value: 38200 },
	{ name: "Marketplace", value: 29800 },
	{ name: "Social Media", value: 18700 },
];

const SalesChannelChart = () => {
	const [selectedChannel, setSelectedChannel] = useState("All");

	// Function to handle sales channel filter selection
	const handleChannelChange = (e) => {
		setSelectedChannel(e.target.value);
	};

	// Function to determine the fill color of each sales channel bar
	const getFillColor = (channelName, index) => {
		if (selectedChannel === "All" || selectedChannel === channelName) {
			return COLORS[index % COLORS.length]; // Use normal colors
		} else {
			return GRAY_COLOR; // Grey out non-selected channels
		}
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-lg font-medium text-gray-100'>Sales by Channel</h2>

				{/* Dropdown for filtering sales channels */}
				<select
					className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
					value={selectedChannel}
					onChange={handleChannelChange}
				>
					<option value="All">All</option>
					{SALES_CHANNEL_DATA.map((channel) => (
						<option key={channel.name} value={channel.name}>
							{channel.name}
						</option>
					))}
				</select>
			</div>

			<div className='h-80'>
				<ResponsiveContainer>
					<BarChart data={SALES_CHANNEL_DATA}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey={"value"} fill='#8884d8'>
							{SALES_CHANNEL_DATA.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={getFillColor(entry.name, index)} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesChannelChart;
