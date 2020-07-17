import React from 'react';
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts';

const data = [
  { name: 'Transaction Timeout', value: 63 },
  { name: 'Error 2045', value: 18 },
  { name: 'Error 95883', value: 25 },
];

const COLORS = ['red', 'darkred', 'pink'];

const PieRechart = () => {
  return (
    <PieChart width={400} height={400}>
      <Legend verticalAlign="top" align="right" iconType="square" />
      <Pie data={data} cx={200} cy={200} labelLine={false} dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

PieRechart.propTypes = {};

export default PieRechart;
