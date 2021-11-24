import { useMemo } from 'react';
import { addMinutes, format } from 'date-fns';

import {
  convertIntervaloParaTempo,
  filterLancamentosWithIntervalo,
} from './utils';
import { convertMinutesToObj, formatHoraMinuto } from '../../util/index';

export default function useMemos({
  lancamentoList,
  horaInicio,
  totalMinutesBH,
  currentTime,
}) {
  const lancamentosFiltered = useMemo(() => {
    return filterLancamentosWithIntervalo(lancamentoList);
  }, [lancamentoList]);

  const totalTempoCorretiva = useMemo(() => {
    if (lancamentoList) {
      return convertIntervaloParaTempo({
        intervalo: lancamentosFiltered.reduce(
          (prev, c) =>
            c.tarefaEvolutiva ? prev : prev + Number.parseInt(c.intervalo, 10),
          0
        ),
        tarefaEvolutiva: false,
      });
    }

    return 0;
  }, [lancamentoList, lancamentosFiltered]);

  const totalTempoEvolutiva = useMemo(() => {
    if (lancamentoList) {
      return convertIntervaloParaTempo({
        intervalo: lancamentosFiltered.reduce(
          (prev, c) =>
            c.tarefaEvolutiva ? prev + Number.parseInt(c.intervalo, 10) : prev,
          0
        ),
        tarefaEvolutiva: true,
      });
    }

    return 0;
  }, [lancamentoList, lancamentosFiltered]);

  const totalMinutosLancados = useMemo(() => {
    return (
      lancamentoList.reduce(
        (acc, current) => acc + Number.parseInt(current.intervalo, 10),
        0
      ) || 0
    );
  }, [lancamentoList]);

  const totalMinutosLancamentosSemIntervalo = useMemo(() => {
    return (
      lancamentosFiltered.reduce(
        (acc, current) => acc + Number.parseInt(current.intervalo, 10),
        0
      ) || 0
    );
  }, [lancamentosFiltered]);

  const totalLancado = useMemo(() => {
    const { hora, minuto } = convertMinutesToObj(
      totalMinutosLancamentosSemIntervalo
    );
    return `${hora}h, ${minuto}m`;
  }, [totalMinutosLancamentosSemIntervalo]);

  const horaFinal = useMemo(() => {
    return addMinutes(horaInicio, totalMinutosLancados);
  }, [totalMinutosLancados, horaInicio]);

  const horaFinalFormatted = useMemo(() => {
    return `${formatHoraMinuto(horaFinal)}`;
  }, [horaFinal]);

  const osList = useMemo(() => {
    const lista = lancamentosFiltered.map((i) => i.os) || [];
    const osSet = new Set(lista);
    return osSet || [];
  }, [lancamentosFiltered]);

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

  const totalBH = useMemo(() => {
    return convertIntervaloParaTempo({
      intervalo: totalMinutesBH,
      tarefaEvolutiva: false,
    });
  }, [totalMinutesBH]);

  const currentHour = useMemo(() => {
    return format(currentTime, 'HH:mm');
  }, [currentTime]);

  return {
    totalTempoCorretiva,
    totalTempoEvolutiva,
    totalLancado,
    horaFinalFormatted,
    totalOS,
    osSelectList,
    sistemaSelectList,
    totalBH,
    currentHour,
  };
}
