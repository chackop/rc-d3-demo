import React, { useRef, useEffect, useState } from 'react';
import { basicData } from '../../data/index';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState([300, 150]);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      // Set resized dimensions
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

const ResponsiveD3 = () => {
  const [data, setData] = useState(basicData);
  const svgRef = useRef(null);

  const wrapperRef = useRef(null);
  // const dimensions = useResizeObserver(svgRef);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);

    console.log(dimensions);

    if (!dimensions) return;

    const xScale = scaleBand()
      .domain(data.map((value, index) => index)) // Explicit mapping of values
      .range([0, dimensions.width])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([dimensions.height, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);

    svg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = axisRight(yScale);

    svg
      .select('.y-axis')
      .style('transform', `translateX(${dimensions.width}px)`)
      .call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value, index) => xScale(index))
      .attr('width', xScale.bandwidth())
      .attr('y', -dimensions.width)
      .on('mouseenter', (value, index) => {
        svg
          .selectAll('.tooltip')
          .data([value])
          .join((entry) => entry.append('text').attr('y', yScale(value) - 4)) // ease jump transition
          .attr('class', 'tooltip')
          .text(value)
          .attr('x', xScale(index) + xScale.bandwidth() / 2)
          .transition()
          .attr('y', yScale(value) - 8)
          .attr('text-anchor', 'middle')
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.select('.tooltip').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', (value) => dimensions.height - yScale(value));
  }, [data, dimensions]);
  return (
    <React.Fragment>
      <div ref={wrapperRef}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <br />
      <br />

      <br />
      {/* <button onClick={() => setData(data.map((value) => value + 5))}>
        Update data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 100))}>
        Filter data
      </button> */}
    </React.Fragment>
  );
};

export default ResponsiveD3;
