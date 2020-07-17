import React, { useRef, useEffect, useState } from 'react';
import { basicData } from '../../data/index';
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  axisLeft,
  scaleLinear,
} from 'd3';

const BasicLineD3 = () => {
  const [data, setData] = useState(basicData);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      // @ts-ignore
      .tickFormat((index) => index + 1);

    // @ts-ignore
    svg.select('.x-axis').style('transform', 'translateY(150px)').call(xAxis);

    const yAxis = axisLeft(yScale);

    // @ts-ignore
    svg.select('.y-axis').call(yAxis);

    // generates the "d" attribute of a path element
    const myLine = line()
      .x((value, index) => xScale(index))
      // @ts-ignore
      .y(yScale)
      .curve(curveCardinal);

    // renders path element, and attaches
    // the "d" attribute from line generator above
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      // @ts-ignore
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />

      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter data
      </button>
    </React.Fragment>
  );
};

export default BasicLineD3;
