/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Box, Container, FormLabel, Grid,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '../../state/reduxHooks';
import { fetchPorts, fetchRates } from '../../state/thunks';
import PortDropDown from '../PortDropDown/PortDropDown';
import { getPorts, getRateError, getRates } from '../../state/selectors';
import Chart from '../Chart/Chart';
import { PortType } from '../../state/types';

function Home() {
  const dispatch = useAppDispatch();
  const ports = useAppSelector(getPorts);
  const rates = useAppSelector(getRates);
  const rateError = useAppSelector(getRateError);
  const [selectedPorts, setSelectedPorts] = useState({ origin: 'CNSGH', dest: 'NLRTM' });
  const [marketPosition, setMarketPosition] = useState('mean');

  useEffect(() => {
    dispatch(fetchPorts());
  }, []);

  useEffect(() => {
    dispatch(fetchRates(selectedPorts));
  }, [selectedPorts]);

  const updatePorts = (name: PortType, value: string) => {
    if (selectedPorts[name] !== value) {
      setSelectedPorts({ ...selectedPorts, [name]: value });
    }
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', maxHeight: '100%' }}
    >
      <Grid xs={5}>
        <PortDropDown name="origin" ports={ports} updatePorts={updatePorts} />
        <PortDropDown name="dest" ports={ports} updatePorts={updatePorts} />
      </Grid>
      <Grid xs={5}>
        <FormGroup sx={{
          marginLeft: '15%',
          border: '1px solid lightgray',
          paddingLeft: 1,
          borderRadius: '5px',
        }}
        >
          <FormLabel>Market Postion</FormLabel>
          <div>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={marketPosition === 'high'}
                  onChange={() => { setMarketPosition('high'); }}
                />
            )}
              label="Market High"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={marketPosition === 'mean'}
                  onChange={() => { setMarketPosition('mean'); }}
                />
        )}
              label="Market Average"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={marketPosition === 'low'}
                  onChange={() => { setMarketPosition('low'); }}
                />
)}
              label="Market Low"
            />
          </div>
        </FormGroup>
      </Grid>
      <Grid xs={10}>
        {rateError !== null ? <div>{rateError}</div> : (
          <Chart rates={rates} marketPosition={marketPosition} />
        )}
      </Grid>

    </Grid>
  );
}

export default Home;
