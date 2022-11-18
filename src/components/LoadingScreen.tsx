import { m } from 'framer-motion'
// @mui
import { alpha, styled } from '@mui/material/styles'
import { Box, SxProps } from '@mui/material'
//
import Logo from './Logo'
import ProgressBar from './ProgressBar'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}))

// ----------------------------------------------------------------------

type Props = {
  isDashboard?: boolean
  sx?: SxProps
}

export default function LoadingScreen({ isDashboard, ...other }: Props) {
  return (
    <>
      <ProgressBar />

      {!isDashboard && (
        <RootStyle {...other}>
          <m.div
            animate={{
              scale: [1, 0.9, 0.9, 1, 1],
              opacity: [1, 0.48, 0.48, 1, 1],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeatDelay: 1,
              repeat: Infinity,
            }}
          >
            <Logo disabledLink />
          </m.div>
        </RootStyle>
      )}
    </>
  )
}
