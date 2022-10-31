/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '../../state/reduxHooks';
import { getRateError } from '../../state/selectors';

interface IProps {
   marketPosition: string,
   updateMarketPosition: Function,
}

function MarketPosition({ marketPosition, updateMarketPosition }: IProps) {
  const { t } = useTranslation();
  const rateError = useAppSelector(getRateError);
  const marketPositions = ['high', 'mean', 'low'];
  return (
    <FormGroup sx={{
      border: '1px solid lightgray',
      paddingLeft: 1,
      borderRadius: '5px',
    }}
    >
      <>
        <FormLabel>{t('Market Postion')}</FormLabel>
        <div>
          {marketPositions.map((mp) => (
            <FormControlLabel
              control={(
                <Checkbox
                  id={`${mp}-checkbox`}
                  data-testid={`${mp}-checkbox`}
                  checked={marketPosition === mp}
                  onChange={() => { updateMarketPosition(mp); }}
                  disabled={rateError !== null}
                />
            )}
              label={t(`Market ${mp}`)}
            />
          ))}
        </div>
      </>
    </FormGroup>
  );
}

export default MarketPosition;
