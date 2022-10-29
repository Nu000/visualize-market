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

interface IProps {
  name: string,
  ports: IPort[],
}
function PortDropDown({ name, ports }: IProps) {
  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{name}</InputLabel>
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
