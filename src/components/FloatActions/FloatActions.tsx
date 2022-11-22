
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Icon } from '@iconify/react';
import { styled } from '@mui/material';

interface FloatActionsProps {
  refresh?: any
  bet?: any
}
const FloatActions = ({ refresh, bet }: FloatActionsProps) => {

  const actions = [
    { icon: <Icon icon="material-symbols:refresh" />, name: 'Recarregar', action: refresh },
    { icon: <Icon icon="emojione:soccer-ball" />, name: 'Palpite', action: bet },
  ];
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: '-100px', right: 25 }}>
    </Box>
  );
}

export default FloatActions