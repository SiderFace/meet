import React, { useEffect, useState } from "react";
import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   Legend,
   Tooltip,
} from "recharts";

const EventGenre = ({ events }) => {
   const [data, setData] = useState([]);

   useEffect(() => {
      setData(() => getData());
   }, [events]);

   const getData = () => {
      const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
      const data = genres.map((genre) => {
         const value = events.filter(
         (ev) => ev.summary.indexOf(genre) >= 0
         ).length;
         return { name: genre, value };
      });
      return data;
  };

   const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
      const RADIAN = Math.PI / 180;
      const radius = outerRadius;
      const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
      const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
      const genreName = data[index].name;

      return percent ? (
         <text
            x={x}
            y={y}
            fill="#8884d8"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
         >
            {`${genreName} ${(percent * 100).toFixed(0)}%`}
         </text>
      ) : null;
   };

  const COLORS = ["#2364aa", "#3da5d9", "#73bfb8", "#fec601", "#ea7317"];

   return (
      <ResponsiveContainer height={400}>
         <PieChart width="99%" height={400}>
         <Tooltip />
         <Legend verticalAlign="bottom" />
            <Pie
               data={data}
               dataKey="value"
               fill="#8884d8"
               labelLine={false}
               label={renderCustomizedLabel}
               outerRadius={130}
               cx={200}
               cy={200}
            >
               {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
               ))}
            </Pie>
         </PieChart>
      </ResponsiveContainer>
   );
};

export default EventGenre;