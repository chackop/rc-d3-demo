import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { recievedData } from '../../data';

const graphMargin = { top: 10, bottom: 50, left: 50, right: 10 };
const canvasHeight = 300 - graphMargin.top - graphMargin.bottom;
const canvasWidth = 400 - graphMargin.left - graphMargin.right;

const BarD3 = () => {
  const graphRef = useRef(null);
  const [switchData, setSwitchData] = useState(true);
  const ObjKey = switchData ? 'sentData' : 'recieveData';

  useEffect(() => {
    const svgCanvas = d3
      .select(graphRef.current)
      .append('svg')
      .attr('width', canvasWidth + graphMargin.left + graphMargin.right)
      .attr('height', canvasHeight + graphMargin.top + graphMargin.bottom)
      .append('g')
      .attr('transform', `translate(${graphMargin.left}, ${graphMargin.top})`)
      .attr('id', 'bar-d3');
  }, []);

  useEffect(() => {
    const svgCanvas = d3.select('#bar-d3');

    const yScale = d3
      .scaleLinear()
      // @ts-ignore
      .domain([
        // @ts-ignore
        d3.min(recievedData, (d) => d[ObjKey]) * 0.95,
        // @ts-ignore
        d3.max(recievedData, (d) => d[ObjKey]),
      ])
      .range([canvasHeight, 0]);
    const yAxis = d3.axisLeft(yScale);
    svgCanvas.append('g').transition().duration(500).call(yAxis);

    const xScale = d3
      .scaleBand()
      .domain(recievedData.map((data) => data.name))
      .range([0, canvasWidth])
      .padding(0.4);

    const xAxis = d3.axisBottom(xScale);
    svgCanvas
      .append('g')
      .attr('transform', `translate(0, ${canvasHeight})`)
      .transition()
      .duration(500)
      .call(xAxis);

    svgCanvas
      .append('text')
      .attr('x', canvasWidth / 2)
      .attr('y', canvasHeight + 40)
      .attr('text-anchor', 'middle')
      .text('DFSP category');

    svgCanvas
      .append('text')
      .attr('x', -canvasHeight / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .text('Transfer data')
      .attr('transform', 'rotate(-90)');

    // Data join
    const dataInst = svgCanvas.selectAll('rect').data(recievedData);

    // Exit
    dataInst
      .exit()
      .attr('fill', 'yellow')
      .attr('height', 0)
      .attr('y', canvasHeight)
      .transition()
      .duration(500)
      .remove();

    // Update;
    // @ts-ignore
    dataInst
      .transition()
      .duration(500)
      .attr('width', xScale.bandwidth)
      .attr('height', (datapoint) => canvasHeight - yScale(datapoint[ObjKey]))
      .attr('x', (datapoint) => xScale(datapoint.name))
      .attr('y', (datapoint: any) => yScale(datapoint[ObjKey]));

    // Data enter
    // @ts-ignore
    dataInst
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth)
      .attr('height', (datapoint) => canvasHeight - yScale(datapoint[ObjKey]))
      .attr('fill', switchData ? 'red' : 'blue')
      .attr('x', (datapoint) => xScale(datapoint.name))
      .attr('y', canvasHeight)
      .transition()
      .duration(500)
      .attr('height', (d: any) => canvasHeight - yScale(d[ObjKey]))
      .attr('y', (datapoint: any) => yScale(datapoint[ObjKey]));
  }, [ObjKey, switchData]);

  return (
    <>
      <div ref={graphRef}></div>
      <button onClick={() => setSwitchData(!switchData)}>Switch Data</button>
    </>
  );
};

BarD3.propTypes = {};

export default BarD3;
