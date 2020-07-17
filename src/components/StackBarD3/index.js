import React, { useEffect, useRef, useState } from 'react';
import ChartLegend from '../ChartLegend/index';
import useResizeObserver from '../ResponsiveD3/useResizeObserver';
import { transportObject } from '../../data/index';
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
} from 'd3';

const StackBarD3 = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [stackKeys, setStackKeys] = useState(transportObject.transportKeys);

  const onChange = (evt, key) => {
    if (evt.target.checked) {
      setStackKeys(Array.from(new Set([...stackKeys, key])));
    } else {
      setStackKeys(stackKeys.filter((_key) => _key !== key));
    }
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    // const { width, height } =
    //   dimensions || wrapperRef.current.getBoundingClientRect();

    const width = 500;
    const height = 170;

    // stacks / layers
    const stackGenerator = stack().keys(stackKeys).order(stackOrderAscending);
    const layers = stackGenerator(transportObject.transportData);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    // scales
    const xScale = scaleBand()
      .domain(transportObject.transportData.map((d) => d.year))
      .range([0, width])
      .padding(0.25);

    const yScale = scaleLinear().domain(extent).range([height, 0]);

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select('.y-axis').call(yAxis);

    // rendering
    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => transportObject.transportColors[layer.key])
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('x', (sequence) => xScale(sequence.data.year))
      .attr('width', xScale.bandwidth())
      .attr('y', (sequence) => yScale(sequence[1]))
      .attr('height', (sequence) => yScale(sequence[0]) - yScale(sequence[1]));
  }, [dimensions, stackKeys]);

  return (
    <div>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <div className="legend-fields">
        {transportObject.transportKeys.map((dataKey, index) => {
          return (
            <ChartLegend
              onChange={(evt) => onChange(evt, dataKey)}
              dataKey={dataKey}
              key={`ChartLegendKey-${dataKey}-${index}`}
              colors={transportObject.transportColors}
              checked={stackKeys.includes(dataKey)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StackBarD3;
