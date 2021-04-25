import { useEffect } from 'react';
import { setHours, setMinutes, parseISO, formatISO } from 'date-fns';

import { convertMinutesToObj, formatHoraLancamento } from '../../util/index';

export default function useEffects({
  lancamentoList,
  horaInicio,
  newLancamento,
  setOsSelected,
  setSistemaSelected,
  setLancamentoList,
  setHoraInicio,
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
          {
            id: 1,
            acao: 'inicio trabalho',
            hora: new Date(),
            horaFormatted: formatHoraLancamento(new Date()),
            minutesConverted: `${hora}h, ${minuto}m`,
            intervalo,
            sistema: 'CRM',
            os: '123',
          },
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

    loadFromStorage();
    loadDataInicioFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
