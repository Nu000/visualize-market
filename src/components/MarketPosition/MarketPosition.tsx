/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface IProps {
   marketPosition: string,
   updateMarketPosition: Function,
}

function MarketPosition({ marketPosition, updateMarketPosition }: IProps) {
  const { t } = useTranslation();

  return (

    <FormGroup sx={{
      marginLeft: '15%',
      border: '1px solid lightgray',
      paddingLeft: 1,
      borderRadius: '5px',
    }}
    >
      <FormLabel>{t('Market Postion')}</FormLabel>
      <div>
        <FormControlLabel
          control={(
            <Checkbox
              id="high-checkbox"
              data-testid="high-checkbox"
              checked={marketPosition === 'high'}
              onChange={() => { updateMarketPosition('high'); }}
            />
            )}
          label={t('Market High')}
        />
        <FormControlLabel
          control={(
            <Checkbox
              id="mean-checkbox"
              data-testid="mean-checkbox"
              checked={marketPosition === 'mean'}
              onChange={() => { updateMarketPosition('mean'); }}
            />
        )}
          label={t('Market Average')}
        />
        <FormControlLabel
          control={(
            <Checkbox
              id="low-checkbox"
              data-testid="low-checkbox"
              checked={marketPosition === 'low'}
              onChange={() => { updateMarketPosition('low'); }}
            />
)}
          label={t('Market Low')}
        />
      </div>
    </FormGroup>
  );
}

export default MarketPosition;
