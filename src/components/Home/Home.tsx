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
import { getPorts, getRates } from '../../state/selectors';
import Chart from '../Chart';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ports = useAppSelector(getPorts);
  const rates = useAppSelector(getRates);

  useEffect(() => {
    dispatch(fetchPorts());
    dispatch(fetchRates({ origin: 'CNSGH', dest: 'NLRTM' }));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ minWidth: 120, marginTop: '10px' }}>
        <PortDropDown name="Origin" ports={ports} />
        <PortDropDown name="Destination" ports={ports} />
      </Box>
      <Box sx={{ minWidth: 120, marginTop: '10px' }}>
        <Chart rates={rates} />
      </Box>
    </Container>
  );
}

export default Home;
