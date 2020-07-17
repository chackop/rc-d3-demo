// /* eslint-disable */

// const Node = ({ x, y, radius }: { x: number, y: number, radius: number }) => (
//   <circle cx={x} cy={y} r={radius} fill="black" />
// );
import { TransitionMotion, Motion, spring } from 'react-motion';
// class Layout extends React.Component {
//   render() {
//     return (
//       <TransitionMotion styles={d3.layoutFunc(this.props.data)}>{
//         (interploatedStyles) =>
//           this.props.children(interpolatedStyles)
//       }</TransitionMotion>
//     );
//   }
// }
// export default BarD3;
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { basicData as data } from '../../data/index';
function Test() {
  const xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([0, 300]);
  const yScale = d3.scaleLinear().domain([0, 150]).range([150, 0]);

  const lineFn = d3
    .line()
    .x(function (d) {
      return xScale(d[0]);
    })
    .y(function (d) {
      return yScale(d[1]);
    })
    .curve(d3.curveBundle.beta(0.5));

  function testData(count) {
    return [
      [[...new Array(count)].map((_, index) => 10 * index)],
      [[...new Array(count)].map((_, index) => Math.random() * 10)],
    ];
  }
  const d = lineFn([
    [10, 20],
    [20, 30],
    [20, -60],
  ]);
  console.log(d);
  return (
    <svg>
      <Motion
        defaultStyle={{ x: 0 }}
        style={{ x: spring(200, { stiffness: 10, damping: 7 }) }}
      >
        {(interpolatingStyle) => {
          return (
            <Circle
              x={interpolatingStyle.x}
              style={interpolatingStyle}
              size={20}
            />
          );
        }}
      </Motion>
      {/*<MyLine d={(d || '').toString()} />*/}
    </svg>
  );
}
function MyLine({ d = '' }) {
  return <path d={d} stroke="red" fill="none" />;
}
function Circle({ size = 0, style = {}, x = 0 }) {
  return (
    <circle cx={x} y={100} style={style} r={size} stroke="red" fill="blue" />
  );
}

export default Test;
