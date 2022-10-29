import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
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
      <Box sx={{ minWidth: 120, marginTop: '10px' }}>
        <PortDropDown name="origin" ports={ports} updatePorts={updatePorts} />
        <PortDropDown name="dest" ports={ports} updatePorts={updatePorts} />
      </Box>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={marketPosition === 'high'}
                onChange={() => { setMarketPosition('high'); }}
              />
            )}
            label="High"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={marketPosition === 'mean'}
                onChange={() => { setMarketPosition('mean'); }}
              />
        )}
            label="Mean"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={marketPosition === 'low'}
                onChange={() => { setMarketPosition('low'); }}
              />
)}
            label="Low"
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
