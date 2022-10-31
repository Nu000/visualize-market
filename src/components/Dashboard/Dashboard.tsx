/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Box, Container, FormLabel, Grid, CircularProgress,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../state/reduxHooks';
import { fetchPorts, fetchRates } from '../../state/thunks';
import PortDropDown from '../PortDropDown/PortDropDown';
import {
  getPorts, getPortsLoadingState, getRateError, getRates, getRatesLoadingState,
} from '../../state/selectors';
import Chart from '../Chart/Chart';
import { PortType } from '../../state/types';
import MarketPosition from '../MarketPosition/MarketPosition';

function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const ports = useAppSelector(getPorts);
  const rates = useAppSelector(getRates);
  const rateError = useAppSelector(getRateError);
  const loadingPorts = useAppSelector(getPortsLoadingState);
  const loadingRates = useAppSelector(getRatesLoadingState);
  const [selectedPorts, setSelectedPorts] = useState({ origin: 'CNSGH', dest: 'NLRTM' });
  const [marketPosition, setMarketPosition] = useState('mean');

  useEffect(() => {
    dispatch(fetchPorts());
  }, []);

  useEffect(() => {
    if (selectedPorts.origin && selectedPorts.dest) {
      dispatch(fetchRates(selectedPorts));
    }
  }, [selectedPorts]);

  const updatePorts = (name: PortType, value: string) => {
    if (selectedPorts[name] !== value) {
      setSelectedPorts({ ...selectedPorts, [name]: value });
    }
  };

  return (
    loadingPorts ? (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <CircularProgress />
      </div>
    )
      : (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh', maxHeight: '100%' }}
        >
          <Grid item xs={10}>
            <h2>{t('Market Rates')}</h2>
          </Grid>
          <Grid item xs={5}>
            <PortDropDown name="origin" ports={ports} updatePorts={updatePorts} />
            <PortDropDown name="dest" ports={ports} updatePorts={updatePorts} />
          </Grid>
          <Grid item xs={5}>
            <MarketPosition
              marketPosition={marketPosition}
              updateMarketPosition={setMarketPosition}
            />
          </Grid>
          <Grid item xs={10}>
            {rateError !== null && <Alert severity="error">{rateError}</Alert>}

            {loadingRates ? <div style={{ height: '600px' }}><CircularProgress /></div>
              : (
                <Chart rates={rates} marketPosition={marketPosition} />
              )}
          </Grid>

        </Grid>
      )
  );
}

export default Dashboard;
