import { getHours, getMinutes } from 'date-fns';

export function formatHoraLancamento(date) {
  return `${getHours(date)}:${getMinutes(date)}`;
}

export function formatHoraMinuto(date) {
  return `${getHours(date)}:${String(getMinutes(date)).padStart(2, '0')}`;
}
