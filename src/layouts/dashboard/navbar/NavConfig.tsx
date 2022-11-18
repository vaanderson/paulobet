//  Sub menu exemplo =>
// {
//   subheader: 'Agendamentos',
//   items: [
//     {
//       title: 'Agendamentos',
//       path: '/appointment',
//       icon: <Icon icon='akar-icons:calendar' />,
//       children: [
//         { title: 'Agenda', path: '/appointment/list' },
//         { title: 'Fila de espera', path: '/appointment/queue' },
//       ],
//     },
//   ],
// },

import { Icon } from '@iconify/react'

const navConfig = [
  {
    subheader: 'Bolões',
    items: [
      {
        title: 'Bolão',
        path: '/',
        icon: <Icon icon='tabler:soccer-field' />,
      },
    ],
  },
]

export default navConfig
