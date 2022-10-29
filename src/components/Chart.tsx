// @ts-nocheck
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { IRate } from '../state/interfaces';
import './chart.css';

interface IProps {
    rates: IRate[],
    marketPosition: string
}
function Chart({ rates, marketPosition } : IProps) {
  const [activeIndex, setActiveIndex] = useState(null);
  //   const [dateRange, setDateRange] = useState(
  //     { start: rates[0].day, end: rates[rates.length - 1].day },
  //   );
  let { innerWidth: width, innerHeight: height } = window;

  const [data, setData] = React.useState([]);
  const margin = {
    top: 60, right: 10, bottom: 80, left: 10,
  };
  height = height - margin.top - margin.bottom;
  width = width - margin.left - margin.right;

  const color = 'slateblue';

  useEffect(() => {
    const parseDate = d3.timeParse('%Y-%m-%d');
    const data = [];
    rates.forEach((element) => {
      const datapoint = {
        day: parseDate(element.day),
        marketPosition: Number(element[marketPosition]),
      };
      data.push(datapoint);
    });
    setData(data);
  }, [rates, marketPosition]);
  const yMinValue = d3.min(data, (d) => d.marketPosition);
  const yMaxValue = d3.max(data, (d) => d.marketPosition);

  const getX = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.day))
    .range([0, width]);

  const getY = d3
    .scaleLinear()
    .domain([yMinValue - 1, yMaxValue + 2])
    .range([height, 0]);

  const getXAxis = (ref) => {
    const xAxis = d3.axisBottom(getX);
    d3.select(ref).call(xAxis.tickFormat(d3.timeFormat('%b-%d')));
  };

  const getYAxis = (ref) => {
    const yAxis = d3.axisLeft(getY).tickSize(-width).tickPadding(7);
    d3.select(ref).call(yAxis.tickFormat((y) => `$ ${y}`));
  };

  const linePath = d3
    .line()
    .x((d) => getX(d.day))
    .y((d) => getY(d.marketPosition))
    .curve(d3.curveMonotoneX)(data);

  const areaPath = d3
    .area()
    .x((d) => getX(d.day))
    .y0((d) => getY(d.marketPosition))
    .y1(() => getY(yMinValue - 1))
    .curve(d3.curveMonotoneX)(data);

  const handleMouseMove = (e) => {
    const bisect = d3.bisector((d) => d.day).left;
    const x0 = getX.invert(d3.pointer(e, this)[0]);
    const index = bisect(data, x0, 1);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="wrapper">
      <svg
        viewBox={`0 0 ${width + margin.left + margin.right} 
                          ${height + margin.top + margin.bottom}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g className="axis" ref={getYAxis} />
        <g
          className="axis xAxis"
          ref={getXAxis}
          transform={`translate(0,${height})`}
        />
        <path strokeWidth={3} fill="none" stroke={color} d={linePath} />

        {data.map((item, index) => (
          <g key={item.day}>
            <text
              fill="#666"
              x={getX(item.day)}
              y={getY(item.marketPosition) - 20}
              textAnchor="middle"
            >
              {index === activeIndex ? item.price : ''}
            </text>
            <circle
              cx={getX(item.day)}
              cy={getY(item.marketPosition)}
              r={index === activeIndex ? 6 : 4}
              fill={color}
              strokeWidth={index === activeIndex ? 2 : 0}
              stroke="#fff"
              style={{ transition: 'ease-out .1s' }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default Chart;
