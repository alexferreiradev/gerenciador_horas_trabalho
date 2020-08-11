import { getHours, getMinutes } from 'date-fns';

export function formatHoraLancamento(date) {
  return `${getHours(date)}:${getMinutes(date)}`;
}
