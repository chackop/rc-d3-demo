import React from 'react';
import PropTypes from 'prop-types';

const CustomPathLine = (props: any) => {
  return <path {...props} />;
};

CustomPathLine.propTypes = {
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  strokeDasharray: PropTypes.number,
  d: PropTypes.string,
};

CustomPathLine.defaultProps = {
  stroke: 'blue',
  strokeWidth: 2,
  fill: 'none',
  width: 420,
  height: 242,
  strokeDasharray: '466.52398681640625px 0px',
  d:
    'M50,153.55263157894737L134,105.78947368421052L218,93.68947368421053L302,137.6315789473684L386,156.73684210526315L470,105.78947368421052',
};

export default CustomPathLine;
