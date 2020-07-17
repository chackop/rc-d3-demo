import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { basicData, lineData, coordinateData } from '../../data/index';
import * as d3 from 'd3';
import SVGLine from '../SVGLine';
import SVGPath from '../SVGPath';

const CustomLineLayout = (props: any) => {
  const lineScale = d3.scaleLinear().domain([0, 100]).range([0, 500]);

  const xScale = d3
    .scaleLinear()
    .domain([0, basicData.length - 1])
    .range([0, props.width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, props.height / 2])
    .range([props.height / 2, 0]);

  const myLineFunction = d3
    .line()
    // .x((value, index) => xScale(value[0]))
    // .y((value, index) => yScale(value[1]))
    .x((value, index) => lineScale(value[0]))
    .y((value, index) => lineScale(value[1]))
    // .x((value, index) => value[0])
    // .y((value, index) => value[1])
    .curve(d3.curveCardinal);

  const svgLayoutRef = useRef(null);

  const yAxisProps = {
    width: 30,
    stroke: 'grey',
    height: 242,
    x: 20,
    y: 23,
    fill: 'none',
    x1: 50,
    y1: 23,
    x2: 50,
    y2: 265,
  };

  const referenceLine = {
    stroke: 'red',
    strokeWidth: 2,
    x1: 50,
    y1: yScale(100),
    x2: xScale(6),
    y2: yScale(100),
  };

  //@ts-ignore
  // const basicDataDAttr = myLineFunction(basicData);
  const basicDataDAttr = myLineFunction(coordinateData);

  return (
    <svg ref={svgLayoutRef.current} {...props}>
      <SVGLine /> 
      <SVGLine {...yAxisProps} />
      <SVGLine {...referenceLine} />
      <SVGPath d={basicDataDAttr} stroke="green" />
      <SVGPath />
    </svg>
  );
};

CustomLineLayout.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};
CustomLineLayout.defaultProps = {
  height: 300,
  width: 400,
};

export default CustomLineLayout;
