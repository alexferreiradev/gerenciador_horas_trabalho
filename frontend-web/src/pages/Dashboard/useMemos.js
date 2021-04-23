import { useMemo } from 'react';
import { addMinutes } from 'date-fns';

import { convertIntervaloParaTempo } from './utils';
import { convertMinutesToObj, formatHoraMinuto } from '../../util/index';

export default function useMemos({ lancamentoList, horaInicio }) {
  const totalTempoCorretiva = useMemo(() => {
    if (lancamentoList) {
      return convertIntervaloParaTempo({
        intervalo: lancamentoList.reduce(
          (prev, c) =>
            c.tarefaEvolutiva ? prev : prev + Number.parseInt(c.intervalo, 10),
          0
        ),
        tarefaEvolutiva: false,
      });
    }

    return 0;
  }, [lancamentoList]);

  const totalTempoEvolutiva = useMemo(() => {
    if (lancamentoList) {
      return convertIntervaloParaTempo({
        intervalo: lancamentoList.reduce(
          (prev, c) =>
            c.tarefaEvolutiva ? prev + Number.parseInt(c.intervalo, 10) : prev,
          0
        ),
        tarefaEvolutiva: true,
      });
    }

    return 0;
  }, [lancamentoList]);

  const totalIntervalo = useMemo(() => {
    return (
      lancamentoList.reduce(
        (acc, current) => acc + Number.parseInt(current.intervalo, 10),
        0
      ) || 0
    );
  }, [lancamentoList]);
  const totalLancado = useMemo(() => {
    const { hora, minuto } = convertMinutesToObj(totalIntervalo);
    return `${hora}h, ${minuto}m`;
  }, [totalIntervalo]);
  const horaFinal = useMemo(() => {
    return addMinutes(horaInicio, totalIntervalo);
  }, [totalIntervalo, horaInicio]);
  const horaFinalFormatted = useMemo(() => {
    return `${formatHoraMinuto(horaFinal)}`;
  }, [horaFinal]);
  const osList = useMemo(() => {
    const lista = lancamentoList.map((i) => i.os) || [];
    const osSet = new Set(lista);
    return osSet || [];
  }, [lancamentoList]);
  const sistemaList = useMemo(() => {
    const lista = lancamentoList.map((i) => i.sistema) || [];
    const sistemaSet = new Set(lista);
    return sistemaSet || [];
  }, [lancamentoList]);
  const osSelectList = useMemo(() => {
    if (!osList) return [];
    return (
      [...osList].map((i) => ({ value: i, label: i, isFixed: true })) || []
    );
  }, [osList]);
  const sistemaSelectList = useMemo(() => {
    if (!sistemaList) return [];
    return (
      [...sistemaList].map((i) => ({ value: i, label: i, isFixed: true })) || []
    );
  }, [sistemaList]);
  const totalOS = useMemo(() => {
    if (osList) {
      return osList.size;
    }

    return 0;
  }, [osList]);

  return {
    totalTempoCorretiva,
    totalTempoEvolutiva,
    totalLancado,
    horaFinalFormatted,
    totalOS,
    osSelectList,
    sistemaSelectList,
  };
}
