/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { FormLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface IProps {
   marketPosition: string,
   updateMarketPosition: Function,
}

function MarketPosition({ marketPosition, updateMarketPosition }: IProps) {
  return (

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
              id="high-checkbox"
              checked={marketPosition === 'high'}
              onChange={() => { updateMarketPosition('high'); }}
            />
            )}
          label="Market High"
        />
        <FormControlLabel
          control={(
            <Checkbox
              id="mean-checkbox"
              checked={marketPosition === 'mean'}
              onChange={() => { updateMarketPosition('mean'); }}
            />
        )}
          label="Market Average"
        />
        <FormControlLabel
          control={(
            <Checkbox
              id="low-checkbox"
              checked={marketPosition === 'low'}
              onChange={() => { updateMarketPosition('low'); }}
            />
)}
          label="Market Low"
        />
      </div>
    </FormGroup>
  );
}

export default MarketPosition;
