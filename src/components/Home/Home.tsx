/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Box, Container, FormLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '../../state/reduxHooks';
import { fetchPorts, fetchRates } from '../../state/thunks';
import PortDropDown from '../PortDropDown/PortDropDown';
import { getPorts, getRateError, getRates } from '../../state/selectors';
import Chart from '../Chart';
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
    <Container maxWidth="lg">
      <Box sx={{
        minWidth: 120, marginTop: '10px', display: 'flex', p: 1, m: 1,
      }}
      >
        <PortDropDown name="origin" ports={ports} updatePorts={updatePorts} />
        <PortDropDown name="dest" ports={ports} updatePorts={updatePorts} />
        <FormGroup sx={{
          marginLeft: '15%',
          flexDirection: 'row-reverse',
          border: '1px solid lightgray',
          paddingLeft: 1,
          borderRadius: '5px',
        }}
        >
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
        </FormGroup>
      </Box>
      {rateError !== null ? <p>{rateError}</p> : (
        <Box sx={{ minWidth: 120, marginTop: '10px' }}>
          <Chart rates={rates} marketPosition={marketPosition} />
        </Box>
      )}
    </Container>
  );
}

export default Home;
