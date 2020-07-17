import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const canvasHeight = 300;
const canvasWidth = 400;

const ChartWrapper = () => {
  const wrapRef = useRef(null);

  useEffect(() => {
    const svgCanvas = d3
      .select(wrapRef.current)
      .append('svg')
      .attr('width', canvasWidth)
      .attr('height', canvasHeight)
      .style('border', '1px solid black');
  }, []);
  return <div ref={wrapRef}></div>;
};

export default ChartWrapper;
