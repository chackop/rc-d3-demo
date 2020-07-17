import React from 'react';

const ChartLegend = ({ dataKey, colors, onChange, checked }) => {
  return (
    <div key={dataKey} className="legend-field">
      <input
        id={dataKey}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={dataKey} style={{ color: colors[dataKey] }}>
        {dataKey}
      </label>
    </div>
  );
};

export default ChartLegend;
