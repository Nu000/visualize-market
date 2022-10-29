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
import { IPort } from '../../state/interfaces';
import { PortType } from '../../state/types';

interface IProps {
  name: PortType,
  ports: IPort[],
  updatePorts: Function,
  }

function PortDropDown({ name, ports, updatePorts }: IProps) {
  const [selectedValue, setSelectedValue] = useState(name === 'origin' ? 'CNSGH' : 'NLRTM');

  useEffect(() => {
    updatePorts(name, selectedValue);
  }, [selectedValue]);

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{name === 'origin' ? 'Origin' : 'Destination'}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        value={selectedValue}
        label={name}
        onChange={(e: SelectChangeEvent) => { setSelectedValue(e.target.value as string); }}
      >
        {ports.map((port) => <MenuItem key={port.code} value={port.code}>{port.name}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default PortDropDown;
