import React, { useRef, useEffect, useState } from 'react';
import { basicData } from '../../data/index';
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
} from 'd3';

const AnimatedBarD3 = () => {
  const [data, setData] = useState(basicData);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      // @ts-ignore
      .domain(data.map((value, index) => index)) // Explicit mapping of values
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      // @ts-ignore
      .range(['green', 'orange', 'red'])
      .clamp(true);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      // @ts-ignore
      .tickFormat((index) => index + 1);

    // @ts-ignore
    svg.select('.x-axis').style('transform', 'translateY(150px)').call(xAxis);

    const yAxis = axisRight(yScale);

    // @ts-ignore
    svg.select('.y-axis').style('transform', 'translateX(300px)').call(yAxis);

    // @ts-ignore
    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      // @ts-ignore
      .attr('x', (value, index) => xScale(index))
      .attr('width', xScale.bandwidth())
      .attr('y', -150)
      .on('mouseenter', (value, index) => {
        svg
          .selectAll('.tooltip')
          .data([value])
          .join((entry) => entry.append('text').attr('y', yScale(value) - 4)) // ease jump transition
          .attr('class', 'tooltip')
          .text(value)
          // @ts-ignore
          .attr('x', xScale(index) + xScale.bandwidth() / 2)
          .transition()
          .attr('y', yScale(value) - 8)
          .attr('text-anchor', 'middle')
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.select('.tooltip').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', (value) => 150 - yScale(value));
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
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 100))}>
        Filter data
      </button>
    </React.Fragment>
  );
};

export default AnimatedBarD3;
