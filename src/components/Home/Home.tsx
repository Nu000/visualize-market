import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/reduxHooks';
import { fetchPorts, fetchRates } from '../../state/thunks';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPorts());
    dispatch(fetchRates({ origin: 'CNSGH', dest: 'NLRTM' }));
  }, []);

  return (
    <Container maxWidth="lg">
      <p>Home</p>
    </Container>
  );
}

export default Home;
