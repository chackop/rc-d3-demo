import React from 'react';
import {
  ComposedChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    rate: 1200,
    rateRange: [100, 4500],
    area: 500,
    timeStamp: '0938 PM',
    milliSec: '-10000',
  },
  {
    rate: 2300,
    area: 2200,
    rateRange: [90, 3500],
  },
  {
    rate: 1200,
    area: 200,
    timeStamp: '1205 AM',
    milliSec: '-5000',
    rateRange: [80, 3300],
  },
  {
    rate: 3200,
    area: 700,
    rateRange: [30, 4300],
  },
  {
    rate: 2200,
    area: 3000,
    timeStamp: '0338 PM',
    milliSec: '0',
    rateRange: [30, 5600],
  },
  {
    rate: 2600,
    area: 1000,
    timeStamp: 'NOW',
    milliSec: '5000',
    rateRange: [240, 5900],
  },
  {
    rate: 3200,
    area: 3000,
    timeStamp: '0608 PM',
    milliSec: '10000',
    rateRange: [400, 5500],
  },
];

const AreaLineRechart = () => {
  return (
    <ComposedChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="timeStamp" width={30} stroke="grey" />
      <YAxis dataKey="milliSec" width={30} stroke="grey" />
      <Tooltip />
      <Legend verticalAlign="top" iconType="square" />
      <Line dataKey="rate" stroke="blue" strokeWidth={2} />
      <Area
        type="monotone"
        dataKey="rateRange"
        stroke="lightblue"
        fill="lightblue"
      />
    </ComposedChart>
  );
};

AreaLineRechart.propTypes = {};

export default AreaLineRechart;
