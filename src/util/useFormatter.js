import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as d3 from 'd3';
import { setRateError } from '../state/marketRatesSlice';
import { useAppDispatch } from '../state/reduxHooks';

function useFormatter(rates, marketPosition) {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const formattedData = [];
    rates.forEach((element) => {
    // set error when there are null values in response
      if (element.day === null || element.high === null
            || element.mean === null || element.low === null) {
        dispatch(setRateError(t('Invalid Data')));
      }
      // prepare data to display in the chart
      const parseDate = d3.timeParse('%Y-%m-%d');
      const datapoint = {
        day: parseDate(element.day),
        marketPosition: Number(element[marketPosition]),
      };
      formattedData.push(datapoint);
    });
    setData(formattedData);
  }, [rates, marketPosition]);
  return data;
}

export default useFormatter;
