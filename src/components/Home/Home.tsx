import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/reduxHooks';
import { fetchPorts, fetchRates } from '../../state/thunks';
import PortDropDown from '../PortDropDown/PortDropDown';
import { getPorts, getRateError, getRates } from '../../state/selectors';
import Chart from '../Chart';
import { IPort } from '../../state/interfaces';
import { FetchError, PortType } from '../../state/types';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ports = useAppSelector(getPorts);
  const rates = useAppSelector(getRates);
  const rateError = useAppSelector(getRateError);
  const [selectedPorts, setSelectedPorts] = useState({ origin: 'CNSGH', dest: 'NLRTM' });

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
      {rateError !== null ? <p>{rateError}</p> : (
        <Box sx={{ minWidth: 120, marginTop: '10px' }}>
          <Chart rates={rates} />
        </Box>
      )}
    </Container>
  );
}

export default Home;
