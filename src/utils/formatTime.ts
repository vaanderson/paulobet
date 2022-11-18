import { format, getTime, formatDistanceToNow } from 'date-fns';
import pt from 'date-fns/locale/pt';
// ----------------------------------------------------------------------

const options =
{
  locale: pt
}



export function fDate(date: Date | string | number) {
  return format(new Date(date), 'dd MMMM yyyy', options);
}

export function fDateTime(date: Date | string | number) {
  return format(new Date(date), 'dd MMM yyyy p', options);
}

export function fTimestamp(date: Date | string | number) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p', options);
}

export function fDateTimeAppointment(date: Date | string | number) {
  return format(new Date(date), 'dd/MM p', options);
}

export function fDatePostFormat(date: Date | string | number) {
  return format(new Date(date), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
}




export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    ...options
  });
}
