import * as React from 'react'
// @mui
import { useTheme } from '@mui/material/styles'
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material'
import Iconify from '../Iconify'
import Label from '../Label'
import TableMoreMenu from './TableMoreMenu'
import defaultThumb from 'src/assets/img/defaultThumb.png'
import { fDateTimeAppointment } from 'src/utils/formatTime'
import BadgeAppointment from '../BadgeAppointment'

type Props = {
  row: any
  selected: boolean
  onEditRow?: VoidFunction
  onSelectRow?: VoidFunction
  onDeleteRow?: VoidFunction
}

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme()
  const [openMenu, setOpenMenuActions] = React.useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  return (
    <TableRow hover selected={selected} onClick={onSelectRow}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row.patient.name} src={row?.patient?.thumb ?? defaultThumb} sx={{ mr: 2 }} />
        <Typography variant='subtitle2' noWrap>
          {row?.patient.name}
        </Typography>
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {row?.description}
      </TableCell>
      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {fDateTimeAppointment(row?.createdAt)}
      </TableCell>

      <TableCell align='left'>
        <BadgeAppointment status={row?.status}>{row?.status}</BadgeAppointment>
      </TableCell>
    </TableRow>
  )
}
