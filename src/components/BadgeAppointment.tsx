import { useTheme } from '@mui/material';
import React from 'react'
import Label from './Label';

export type BadgeAppointmentEnum =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'FINISHED'
  | 'CANCELAD'
  | 'AWAITING_PAYMENT'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_SUCCESS'
  | 'RESCHEDULED'
  | 'PATIENT_MISSED'
  | string;

interface BadgeAppointmentProps {
  status: BadgeAppointmentEnum
  children: React.ReactNode
}
const BadgeAppointment = ({ status = 'PENDING', children }: BadgeAppointmentProps) => {
  const theme = useTheme();
  return (
    <Label
      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
      color={
        (status === 'IN_PROGRESS' && 'info') ||
        (status === 'PENDING' && 'warning') ||
        (status === 'OVERDUE' && 'error') ||
        'default'
      }
      sx={{ textTransform: 'uppercase', mb: 1 }}
    >
      {children}
    </Label>
  )
}

export default BadgeAppointment