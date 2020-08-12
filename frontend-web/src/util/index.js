import { getHours, getMinutes } from 'date-fns';

export function formatHoraLancamento(date) {
  return `${getHours(date)}:${getMinutes(date)}`;
}

export function formatHoraMinuto(date) {
  return `${getHours(date)}:${getMinutes(date)}`;
}
