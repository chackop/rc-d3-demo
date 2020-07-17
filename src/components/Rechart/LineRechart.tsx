import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    milliSec: 175,
    rate: 175,
    avgResp: 160,
  },
  {
    milliSec: 250,
    rate: 250,
    timeStamp: '0938 PM',
    avgResp: 160,
  },
  {
    rate: 269,
    avgResp: 200,
  },
  {
    rate: 200,
    avgResp: 250,
    timeStamp: '1008 PM',
    milliSec: 370,
  },
  {
    rate: 170,
    avgResp: 180,
  },
  {
    rate: 250,
    avgResp: 200,
    timeStamp: 'NOW',
  },
];

const LineRechart = () => {
  return (
    <LineChart
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
      <ReferenceLine y={300} stroke="red" label="ref" />
      <Line dataKey="rate" stroke="blue" strokeWidth={2} />
      <Line dataKey="avgResp" stroke="darkblue" strokeWidth={2} />
    </LineChart>
  );
};

LineRechart.propTypes = {};

export default LineRechart;
