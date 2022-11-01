// @ts-nocheck
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IRate } from '../../state/interfaces';
import { useAppDispatch } from '../../state/reduxHooks';
import './chart.css';
import { setRateError } from '../../state/marketRatesSlice';

interface IProps {
    rates: IRate[],
    marketPosition: string
}
function Chart({ rates, marketPosition } : IProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  let { innerWidth: width, innerHeight: height } = window;
  const [invalidData, setInvalidData] = React.useState(false);
  const [data, setData] = React.useState([]);
  const margin = {
    top: 60, right: 10, bottom: 80, left: 10,
  };
  height = height - margin.top - margin.bottom;
  width = width - margin.left - margin.right;

  const color = 'SkyBlue';

  useEffect(() => {
    const data = [];
    rates.forEach((element) => {
      // set error when there are null values in response
      if (element.day === null || element.high === null
        || element.mean === null || element.low === null) {
        setInvalidData(true);
        dispatch(setRateError(t('Invalid Data')));
      }
      // prepare data to display in the chart
      const parseDate = d3.timeParse('%Y-%m-%d');
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
    .curve(d3.curveStep)(data);

  return (
    <div className="wrapper">
      {!invalidData
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
