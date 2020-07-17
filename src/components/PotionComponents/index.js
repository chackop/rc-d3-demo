/* eslint-disable react/react-in-jsx-scope */
import {
  Svg,
  Circle,
  Ribbon,
  Rect,
  LineRadial,
  Polyline,
  Arc,
} from '@potion/element';
import { Chord, Collection, Grid, Pack, Partition, Pie } from '@potion/layout';
import React, { useEffect, useRef, useState } from 'react';

const PotionChart = () => {
  return (
    <Svg width={400} height={400}>
      <Rect x={100} y={100} width={100} height={200} fill="black" />

      <Pie
        data={[
          { id: 1, key: '1', value: 1 },
          { id: 2, key: '2', value: 2 },
          { id: 3, key: '3', value: 3 },
        ]}
        value={(datum) => datum.value}
        id={(datum) => datum.id}
        sort={(a, b) => a.id - b.id}
        nodeEnter={(d) => ({ ...d, startAngle: d.endAngle })}
        animate
      >
        {(nodes) =>
          nodes.map(({ startAngle, endAngle, key }) => (
            <Arc
              key={key}
              innerRadius={0}
              outerRadius={100}
              startAngle={startAngle}
              endAngle={endAngle}
              fill="black"
              stroke="white"
              strokeWidth={1}
            />
          ))
        }
      </Pie>
    </Svg>
  );
};

export default PotionChart;
