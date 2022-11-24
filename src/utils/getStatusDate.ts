import { addHours } from 'date-fns'

// const options = [
//     ,
//     {
//       value: 'IN_PROGRESS',
//       label: 'Em andamento',
//     },
//     {
//       value: 'NEXT',
//       label: 'Próximos',
//     },
//     {
//       value: 'FINISH',
//       label: 'Finalizados',
//     },
//   ] as Option[]

// Wed Nov 21 2022 16:40:32 GMT-0300 (Horário Padrão de Brasília)

const getStatusDate = (date: string) => {
  const betDateSplit = date.split(' ')
  const betDateCurrent = `${betDateSplit[0]}-${new Date().getFullYear()} ${betDateSplit[1]}`
  const today = new Date().getTime()
  const from = new Date(betDateCurrent).getTime()
  const to = new Date(addHours(new Date(betDateCurrent), 2)).getTime()
  if (today >= from && today <= to) {
    return 'IN_PROGRESS'
  } else if (to < today) {
    return 'FINISH'
  } else if (to > today) {
    return 'NEXT'
  } else {
    return null
  }
}

export default getStatusDate
