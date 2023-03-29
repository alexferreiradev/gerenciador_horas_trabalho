import { useMemo } from 'react';
import { addMinutes, format } from 'date-fns';

import {
  convertIntervaloParaTempo,
  filterLancamentosWithIntervalo,
} from './utils';
import { convertMinutesToObj, formatHoraMinuto } from '../../util/index';
import Constantes from './Constantes';

export default function useMemos({
  lancamentoList,
  horaInicio,
  totalMinutesBH,
  currentTime,
  exportingJSON,
  newLancamento,
  editing,
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
    var lancamentoListWithNewLancamento = [...lancamentoList];
    if (newLancamento && newLancamento.intervalo > 0) {
      if (editing) {
        const lancamentoIndex = lancamentoList.findIndex((i) => i.id === newLancamento.id);
        if (lancamentoIndex < 0) throw new Error('Lancamento invalido para calcular total lançado');

        lancamentoListWithNewLancamento[lancamentoIndex] = newLancamento;
      } else {
        lancamentoListWithNewLancamento.push(newLancamento);
      }
    }
    return (
      lancamentoListWithNewLancamento.reduce(
        (acc, current) => acc + Number.parseInt(current.intervalo, 10),
        0
      ) || 0
    );
  }, [lancamentoList, newLancamento, editing]);

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

  const exportState = useMemo(() => {
    return {
      icon: exportingJSON ? 'wait' : 'download',
      label: exportingJSON
        ? 'Aguarde, gerando arquivo...'
        : 'Exportar como JSON',
    };
  }, [exportingJSON]);

  const osSelected = useMemo(() => {
    if (newLancamento.os) {
      return { label: newLancamento.os, value: newLancamento.os}
    } else return Constantes.emptyLancamento.os;
  }, [newLancamento]);

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
    exportState,
    osSelected,
  };
}
