/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { IPort } from '../../state/interfaces';
import { PortType } from '../../state/types';

interface IProps {
  name: PortType,
  ports: IPort[],
  updatePorts: Function,
  }

function PortDropDown({ name, ports, updatePorts }: IProps) {
  const [selectedValue, setSelectedValue] = useState(name === 'origin' ? {
    code: 'CNSGH',
    name: 'Shanghai',
  } : {
    code: 'NLRTM',
    name: 'Rotterdam',
  });

  useEffect(() => {
    updatePorts(name, selectedValue.code);
  }, [selectedValue]);

  return (
    <FormControl sx={{ m: 1 }}>
      <Autocomplete
        disablePortal
        id={`${name}-select`}
        options={ports}
        sx={{ width: 250 }}
        value={selectedValue}
        getOptionLabel={(port) => `${port.name}(${port.code})`}
        renderOption={(props, port, state) => (
          <li {...props}>
            {`${port.name}(${port.code})`}
          </li>
        )}
        onChange={(e, value) => { setSelectedValue(value as IPort); }}
        renderInput={(params) => <TextField {...params} label={name === 'origin' ? 'Origin' : 'Destination'} />}
      />
    </FormControl>
  );
}

export default PortDropDown;
