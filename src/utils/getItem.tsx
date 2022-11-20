import { Box } from '@mui/material'

export const getIcon = (name: string) => (
  <Box justifyContent='center' display='flex'>
    <Box component='img' src={`/countries/${name}.svg`} alt={name} sx={{ width: 60, height: 60 }} />
  </Box>
)
