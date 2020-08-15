import { getHours, getMinutes } from 'date-fns';

export function formatHoraMinuto(date) {
  return `${getHours(date)}:${String(getMinutes(date)).padStart(2, '0')}`;
}

export function formatHoraLancamento(date) {
  return formatHoraMinuto(date);
}

export function convertMinutesToObj(minutes) {
  const horas = Number.parseInt(minutes, 10) / 60 || 0;
  const hora = Number.parseInt(horas, 10);
  const minuto = Math.round((horas - hora).toFixed(2) * 60);

  return { hora, minuto };
}
