import React from 'react'
import { Icon } from '@iconify/react'
import { Button, Grid, IconButton, ButtonProps } from '@mui/material'
import { useNavigate } from 'react-router';

type BackButtonProps = ButtonProps

const BackButton = ({ ...props }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <Grid container mb={3}>
      <Grid item>
        <Button onClick={props.onClick} variant="outlined" startIcon={<Icon icon='ic:outline-arrow-back' />}>
          Voltar
        </Button>
      </Grid>
    </Grid>
  )
}

export default BackButton