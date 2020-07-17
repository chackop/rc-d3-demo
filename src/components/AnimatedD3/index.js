import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './Graph.css';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Graph({ width = 400, height = 400 }) {
  const margin = 20;
  const myData = restData;
  const data = myData.getData();
  const ref = useRef(null);

  useEffect(() => {
    const data = myData.getData();

    const canvas = setupCanvas(ref, height, width);

    const x = scaleByTime(data, width);
    const y = scaleByHeigth(height - margin);
    const xAxis = getXAxis(x, formatter);
    const yAxis = getYAxis(y);
    const lineFn = getLineFn(x, y);

    canvas
      .append('g')
      .attr('class', 'x axis')
      .attr('clipPath', 'url(#innerGraph)')
      .attr('transform', 'translate(' + margin + ',' + (height - margin) + ')')
      .call(xAxis);

    canvas
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + margin + ' ,0)')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');

    const holder = canvas.append('defs');
    holder
      .append('svg:clipPath')
      .attr('id', 'innerGraph')
      .append('svg:rect')
      .attr('height', height - margin)
      .attr('width', width - margin);

    canvas
      .append('g')
      .attr('clip-path', 'url(#innerGraph)')
      .attr('transform', 'translate(' + margin + ',0)')
      .append('svg:path')
      .attr('class', 'line')
      .attr('d', lineFn(data));

    update();
    //setInterval(update, 1100);
  }, [ref, height, width, myData, update]);

  // useInterval(update, 1100);

  function update() {
    const canvas = d3.select('#animated-svg');
    const x = scaleByTime(data, width);
    const y = scaleByHeigth(height - margin);
    const xAxis = getXAxis(x, formatter);
    const lineFn = getLineFn(x, y);

    //move the graph left
    canvas
      .selectAll('path.line')
      .attr('d', lineFn(myData.getData()))
      .attr('transform', null)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr('transform', 'translate(' + (x(0) - x(1000)) + ')');

    const currentTime = new Date().getTime();
    const startTime = currentTime - 60000;
    x.domain([startTime, currentTime]);
    xAxis.scale(x);

    //move the xaxis left
    canvas
      .select('.x.axis')
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .delay(0)
      .call(xAxis);

    setTimeout(update, 1040);
  }

  return <svg ref={ref} style={{ border: '2px solid #ccc' }} />;
}

function setupCanvas(ref, height, width) {
  return d3
    .select(ref.current)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('id', 'animated-svg');
}

function scaleByTime(data, width) {
  return d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return d[0];
      })
    )
    .range([0, width]);
}

function scaleByHeigth(height) {
  return d3.scaleLinear().domain([0, 10]).range([height, 0]);
}

function formatter(time) {
  if (time.getSeconds() % 10 !== 0) {
    return '';
  }
  return d3.timeFormat('%H:%M:%S')(time);
}

function getXAxis(x, formatter) {
  return d3.axisBottom(x).ticks(d3.timeSecond, 1).tickFormat(formatter);
}

function getYAxis(y) {
  return d3.axisLeft(y);
}

function getLineFn(x, y, interpolation) {
  return d3
    .line()
    .x(function (d) {
      return x(d[0]);
    })
    .y(function (d) {
      return y(d[1]);
    })
    .curve(d3.curveBundle.beta(1));
}

const restData = (function () {
  const data = [];
  const now = new Date().getTime();

  for (let i = 62; i > 0; i--) {
    data.push(produceValue(now - i * 1000));
  }

  setInterval(function () {
    produceRestData();
  }, 1000);

  function produceRestData() {
    data.push(produceValue());

    while (data.length > 62) {
      data.shift();
    }
  }

  function produceValue(currentTime) {
    let now;
    let lastProducedValue;
    if (currentTime) {
      now = currentTime;
    } else {
      now = new Date().getTime();
    }

    if (!lastProducedValue) {
      lastProducedValue = Math.random() * 10;
    } else if (lastProducedValue > 9) {
      lastProducedValue -= Math.random() * 2;
    } else if (lastProducedValue < 1) {
      lastProducedValue += Math.random() * 2;
    } else {
      lastProducedValue += Math.random() * 3 - 1.5;
    }

    return [now, lastProducedValue];
  }

  return {
    getData: function () {
      return data;
    },
  };
})();
