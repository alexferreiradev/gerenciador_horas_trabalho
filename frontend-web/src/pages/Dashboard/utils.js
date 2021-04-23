import { convertMinutesToObj } from '../../util/index';

export function convertIntervaloParaTempo({ intervalo, tarefaEvolutiva }) {
  const { hora, minuto } = convertMinutesToObj(intervalo);
  const minutoScaled = `${(minuto / 60).toFixed(2)}`.split('.')[1];
  if (tarefaEvolutiva) return `${hora}.${minutoScaled}h`;
  return `${hora}h, ${minuto}m`;
}
