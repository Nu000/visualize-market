// @ts-nocheck
import React from 'react';
import * as d3 from 'd3';
import { IRate } from '../../state/interfaces';
import { useAppSelector } from '../../state/reduxHooks';
import './chart.css';
import { getRateError } from '../../state/selectors';
import useFormatter from '../../util/useFormatter';

interface IProps {
    rates: IRate[],
    marketPosition: string
}
function Chart({ rates, marketPosition } : IProps) {
  let { innerWidth: width, innerHeight: height } = window;
  const [invalidData, setInvalidData] = React.useState(false);
  const data = useFormatter(rates, marketPosition);
  const rateError = useAppSelector(getRateError);
  const margin = {
    top: 60, right: 10, bottom: 80, left: 10,
  };
  height = height - margin.top - margin.bottom;
  width = width - margin.left - margin.right;

  const color = 'SkyBlue';

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
    .curve(d3.curveStep)(data);

  return (
    <div className="wrapper">
      {rateError === null
        && (
        <svg
          viewBox={`0 0 ${width + margin.left + margin.right} 
                          ${height + margin.top + margin.bottom}`}
          id="chart"
          data-testid="chart"
        >
          <g className="axis" ref={getYAxis} />
          <g
            className="axis xAxis"
            ref={getXAxis}
            transform={`translate(0,${height})`}
          />
          <path strokeWidth={3} fill="none" stroke={color} d={linePath} />
        </svg>
        )}
    </div>
  );
}

export default Chart;
