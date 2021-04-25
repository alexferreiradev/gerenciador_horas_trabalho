import { convertMinutesToObj, formatHoraLancamento } from '../../util/index';

function createTextoBotaoFrom(newLancamento) {
  const { isIntervalo, tarefaEvolutiva } = newLancamento;
  if (isIntervalo) {
    return 'Bloquear';
  }
  if (tarefaEvolutiva) {
    return 'Copy to Redmine';
  }

  return 'Copy to OS';
}

export function convertIntervaloParaTempo({ intervalo, tarefaEvolutiva }) {
  const { hora, minuto } = convertMinutesToObj(intervalo);
  const minutoScaled = `${(minuto / 60).toFixed(2)}`.split('.')[1];
  if (tarefaEvolutiva) return `${hora}.${minutoScaled}h`;
  return `${hora}h, ${minuto}m`;
}

export function filterLancamentosWithIntervalo(lancamentoList) {
  return lancamentoList.filter((l) => !l.isIntervalo);
}

export function createAcaoFrom(newLancamento) {
  if (newLancamento.isIntervalo) {
    return 'Intervalo - Contabilizado somente na ultima hora lançada';
  }

  return newLancamento.acao;
}

export function createObjetoLancamentoFrom(newLancamento, lastId) {
  const newModel = {
    ...newLancamento,
    hora: new Date(),
    horaFormatted: formatHoraLancamento(new Date()),
    minutesConverted: convertIntervaloParaTempo(newLancamento),
    acao: createAcaoFrom(newLancamento),
    textoBotaoAcao: createTextoBotaoFrom(newLancamento),
  };

  if (lastId) {
    return {
      ...newModel,
      id: lastId + 1,
    };
  }

  return newModel;
}
