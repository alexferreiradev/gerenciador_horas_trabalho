import { useEffect } from 'react';
import { setHours, setMinutes, parseISO, formatISO } from 'date-fns';

import { convertMinutesToObj, formatHoraLancamento } from '../../util';
import { createObjetoLancamentoFrom } from './utils';
import exportJSON from '../../services/exportJson';

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
  setCurrentTime,
  setTotalMinutosBHInput,
  exportingJSON,
  setExportingJSON,
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
    setTotalMinutosBHInput(totalMinutesBH);
  }, [totalMinutesBH, setTotalMinutosBHInput]);

  useEffect(() => {
    if (exportingJSON) {
      console.info('Gerando arquivo JSON para exportação');
      exportJSON(horaInicio, lancamentoList, totalMinutesBH);
      console.info('Arquivo para exportação gerado');
      setExportingJSON(false);
    }
  }, [
    exportingJSON,
    horaInicio,
    lancamentoList,
    totalMinutesBH,
    setExportingJSON,
  ]);

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
              sistema: '',
              os: 'Work',
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

    function setupCurrentTimeUpdate() {
      setInterval(() => {
        setCurrentTime(new Date());
      }, 30_000);
    }

    loadFromStorage();
    loadDataInicioFromStorage();
    loadTotalBHFromStorage();
    setupCurrentTimeUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
