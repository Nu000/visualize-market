/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch } from '../../state/reduxHooks';
import { IPort } from '../../state/interfaces';
import { PortType } from '../../state/types';
import { clearRates } from '../../state/marketRatesSlice';

interface IProps {
  name: PortType,
  ports: IPort[],
  updatePorts: Function,
  }

function PortDropDown({ name, ports, updatePorts }: IProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState(name === 'origin' ? {
    code: 'CNSGH',
    name: 'Shanghai',
  } : {
    code: 'NLRTM',
    name: 'Rotterdam',
  });

  useEffect(() => {
    dispatch(clearRates());
    updatePorts(name, selectedValue?.code);
  }, [selectedValue]);

  return (
    <FormControl sx={{ m: 1 }}>
      <Autocomplete
        disablePortal
        id={`${name}-select`}
        data-testid={`${name}-select`}
        options={ports}
        sx={{ width: 250 }}
        value={selectedValue}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        getOptionLabel={(port) => `${port.name}(${port.code})`}
        renderOption={(props, port, state) => (
          <li {...props}>
            {`${port.name}(${port.code})`}
          </li>
        )}
        onChange={(e, value) => { setSelectedValue(value as IPort); }}
        renderInput={(params) => <TextField {...params} label={name === 'origin' ? t('Origin') : t('Destination')} />}
      />
    </FormControl>
  );
}

export default React.memo(PortDropDown);
