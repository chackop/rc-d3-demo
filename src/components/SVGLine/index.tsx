import React from 'react';
import PropTypes from 'prop-types';

const CustomPathLine = (props: any) => {
  return (
    <g>
      <line {...props}></line>
    </g>
  );
};

CustomPathLine.propTypes = {
  width: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  fill: PropTypes.string,
  x1: PropTypes.number,
  y1: PropTypes.number,
  x2: PropTypes.number,
  y2: PropTypes.number,
};

CustomPathLine.defaultProps = {
  width: 420,
  stroke: 'grey',
  strokeWidth: 2,
  height: 30,
  x: 50,
  y: 265,
  fill: 'none',
  x1: 50,
  y1: 265,
  x2: 470,
  y2: 265,
};

export default CustomPathLine;
