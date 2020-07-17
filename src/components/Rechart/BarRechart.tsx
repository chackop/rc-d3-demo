import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'DFSP 1',
    sentData: 400,
    recieveData: 240,
  },
  {
    name: 'DFSP 2',
    sentData: 300,
    recieveData: 139,
  },
  {
    name: 'DFSP 3',
    sentData: 200,
    recieveData: 580,
  },
  {
    name: 'DFSP 4',
    sentData: 278,
    recieveData: 390,
  },
  {
    name: 'DFSP 5',
    sentData: 189,
    recieveData: 480,
  },
  {
    name: 'DFSP 6',
    sentData: 239,
    recieveData: 380,
  },
];

const marginStyle = {
  top: 5,
  right: 30,
  left: 20,
  bottom: 5,
};

const BarRechart = () => {
  return (
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={marginStyle}
      barGap={0}
      barCategoryGap="20%"
    >
      <Label value="Per DFSP Transfers" position="outside" />

      <Legend verticalAlign="top" iconType="square" />
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="recieveData" fill="red" />
      <Bar dataKey="sentData" fill="green" />
    </BarChart>
  );
};

BarRechart.propTypes = {};

export default BarRechart;
