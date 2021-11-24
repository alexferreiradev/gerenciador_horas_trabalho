import { useEffect } from 'react';
import { setHours, setMinutes, parseISO, formatISO } from 'date-fns';

import { convertMinutesToObj, formatHoraLancamento } from '../../util';
import { createObjetoLancamentoFrom } from './utils';

export default function useEffects({
  lancamentoList,
  horaInicio,
  newLancamento,
  totalMinutesBH,
  setOsSelected,
  setSistemaSelected,
  setLancamentoList,
  setHoraInicio,
  setTotalMinutesBH,
}) {
  useEffect(() => {
    function saveInStorage() {
      if (lancamentoList && lancamentoList.length > 0) {
        localStorage.setItem('lancamentos', JSON.stringify(lancamentoList));
      }
    }

    saveInStorage();
  }, [lancamentoList]);

  useEffect(() => {
    function saveHoraInicioInStorage() {
      if (horaInicio) {
        localStorage.setItem('hora/data-inicio', formatISO(horaInicio));
      }
    }

    saveHoraInicioInStorage();
  }, [horaInicio]);

  useEffect(() => {
    function saveTotalBHInStorage() {
      if (totalMinutesBH) {
        localStorage.setItem('totalBH', totalMinutesBH);
      }
    }

    saveTotalBHInStorage();
  }, [totalMinutesBH]);

  useEffect(() => {
    setOsSelected({ value: newLancamento.os, label: newLancamento.os });
    setSistemaSelected({
      value: newLancamento.sistema,
      label: newLancamento.sistema,
    });
  }, [newLancamento, setSistemaSelected, setOsSelected]);

  useEffect(() => {
    function loadFromStorage() {
      const lancamentoListJson = localStorage.getItem('lancamentos');
      const lancamentoListParsed = JSON.parse(lancamentoListJson);
      if (lancamentoListParsed && lancamentoListParsed.length > 0) {
        setLancamentoList(lancamentoListParsed);
      } else {
        const intervalo = 15;
        const { hora, minuto } = convertMinutesToObj(intervalo);
        setLancamentoList([
          createObjetoLancamentoFrom(
            {
              id: 1,
              acao: 'Inicio trabalho',
              hora: new Date(),
              horaFormatted: formatHoraLancamento(new Date()),
              minutesConverted: `${hora}h, ${minuto}m`,
              intervalo,
              tarefaEvolutiva: true,
              sistema: 'CRM',
              os: '123',
            },
            undefined
          ),
        ]);
      }
    }

    function loadDataInicioFromStorage() {
      const horaInicioISO = localStorage.getItem('hora/data-inicio');
      if (horaInicioISO) {
        setHoraInicio(parseISO(horaInicioISO));
      } else {
        setHoraInicio(setHours(setMinutes(new Date(), 0), 12));
      }
    }

    function loadTotalBHFromStorage() {
      const totalLoadedFromStorange = localStorage.getItem('totalBH');
      if (totalLoadedFromStorange) {
        setTotalMinutesBH(totalLoadedFromStorange);
      } else {
        setTotalMinutesBH(0);
      }
    }

    loadFromStorage();
    loadDataInicioFromStorage();
    loadTotalBHFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
