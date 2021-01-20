import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import * as clipboard from 'clipboard-polyfill/text';
import {
  addMinutes,
  setHours,
  setMinutes,
  parseISO,
  formatISO,
} from 'date-fns';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { Checkbox } from 'semantic-ui-react';
import AsyncCreatableSelect from 'react-select/async-creatable';

import {
  formatHoraLancamento,
  formatHoraMinuto,
  convertMinutesToObj,
} from '../../util/index';

import { Container, Resumo, ListaLancamento, LancamentoItem } from './styles';

function Dashboard() {
  const [lancamentoList, setLancamentoList] = useState([]);
  const emptyLancamento = {
    os: undefined,
    acao: undefined,
    intervalo: undefined,
    sistema: undefined,
    copied: false,
    tarefaEvolutiva: false,
  };
  const [newLancamento, setNewLancamento] = useState(emptyLancamento);
  const [osSelected, setOsSelected] = useState({ value: '', label: '' });
  const [sistemaSelected, setSistemaSelected] = useState({
    value: '',
    label: '',
  });
  const [editing, setEditing] = useState(false);
  const [horaInicio, setHoraInicio] = useState();

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

  function convertIntervaloParaTempo({ intervalo, tarefaEvolutiva }) {
    const { hora, minuto } = convertMinutesToObj(intervalo);
    const minutoScaled = (minuto / 60).toFixed(2) * 100;
    if (tarefaEvolutiva) return `${hora}.${minutoScaled}h`;
    return `${hora}h, ${minuto}m`;
  }

  const formataTempoOS = useCallback(() => {
    return convertIntervaloParaTempo(newLancamento);
  }, [newLancamento]);

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
  }, [newLancamento]);

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
  }, []);

  function handleCancelar() {
    setNewLancamento(emptyLancamento);
    setEditing(false);
    setOsSelected(undefined);
  }

  function valideOrToast() {
    const MsgComponent = ({ msg }) => (
      <div>
        <h3>Preenchimento incorreto</h3>
        <span>{msg}</span>
      </div>
    );

    const { intervalo } = newLancamento;
    let isInvalid = false;
    const msgErrorList = [];
    if (intervalo == null || Number.isNaN(Number.parseInt(intervalo, 10))) {
      isInvalid = isInvalid || true;
      msgErrorList.push(
        'Intervalo inválido. Deve ser um número que indique os minutos trabalhados na OS'
      );
    }
    if (newLancamento.os == null) {
      isInvalid = isInvalid || true;
      msgErrorList.push('Número de OS inválido');
    }
    if (newLancamento.sistema == null) {
      isInvalid = isInvalid || true;
      msgErrorList.push('Sistema informado inválido');
    }
    if (newLancamento.acao == null) {
      isInvalid = isInvalid || true;
      msgErrorList.push('Texto de ação é obrigatório');
    }

    msgErrorList.map((error) => toast.error(<MsgComponent msg={error} />));

    return isInvalid;
  }

  function editLancamento() {
    const lacamentoIndex = lancamentoList.findIndex(
      (i) => i.id === newLancamento.id
    );

    if (lacamentoIndex >= 0) {
      const newList = [...lancamentoList];
      const newLancamentoModel = {
        ...newLancamento,
        hora: new Date(),
        horaFormatted: formatHoraLancamento(new Date()),
        minutesConverted: formataTempoOS(
          newLancamento.intervalo,
          newLancamento.tarefaEvolutiva
        ),
      };
      newList[lacamentoIndex] = newLancamentoModel;
      setLancamentoList(newList);
      toast.success('Lancamento atualizado');
    } else {
      toast.error('Lancamento não foi encontrado');
    }
  }

  function handleLancar() {
    if (valideOrToast()) {
      return;
    }

    if (editing) {
      editLancamento();
      setEditing(false);
    } else {
      let idAux = -1;
      lancamentoList.forEach((i) => {
        if (i.id > idAux) {
          idAux = i.id;
        }
      });
      const lastId = idAux >= 0 ? idAux : 1;
      const newLancamentoModel = {
        ...newLancamento,
        id: lastId + 1,
        hora: new Date(),
        horaFormatted: formatHoraLancamento(new Date()),
        minutesConverted: formataTempoOS(
          newLancamento.intervalo,
          newLancamento.tarefaEvolutiva
        ),
      };
      setLancamentoList([...lancamentoList, newLancamentoModel]);
      toast.success('Lancamento feito com sucesso');
    }

    handleCancelar();
  }

  function handleEdit(lancamentoEditing) {
    setNewLancamento(lancamentoEditing);
    setEditing(true);
  }

  function handleCopy(lancamento) {
    const { acao, id } = lancamento;
    const lancamentoSelectedIndex = lancamentoList.findIndex(
      (i) => i.id === id
    );
    if (lancamentoSelectedIndex >= 0) {
      lancamento.copied = true;
      lancamentoList[lancamentoSelectedIndex] = lancamento;
      setLancamentoList([...lancamentoList]);
      clipboard.writeText(acao);
      toast.success('Acao copiada para área de transferência');
    } else {
      toast.error('Lancamento não encontrado');
    }
  }

  function handleDelete(lancamento) {
    const lancamentoIndex = lancamentoList.findIndex(
      (i) => i.id === lancamento.id
    );

    if (lancamentoIndex >= 0) {
      const newList = [...lancamentoList];
      newList.splice(lancamentoIndex, 1);
      setLancamentoList(newList);
    }
  }

  function handleLimpar() {
    setLancamentoList([]);
  }

  function promiseOSSelect(inputValue) {
    return new Promise((resolve) => {
      resolve(
        osSelectList.filter((i) =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    });
  }

  function promiseSistemaSelect(inputValue) {
    return new Promise((resolve) => {
      resolve(
        sistemaSelectList.filter((i) =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    });
  }

  function handleChangeOS(newV, _) {
    if (!newV) return;
    const { value = '' } = newV;
    setNewLancamento({ ...newLancamento, os: value });
  }

  function handleChangeSistema(newV, _) {
    if (!newV) return;
    const { value = '' } = newV;
    setNewLancamento({ ...newLancamento, sistema: value });
  }

  function handleUnblockEdit() {
    const newLancamentoList = lancamentoList.map((i) => ({
      ...i,
      copied: false,
    }));
    setLancamentoList(newLancamentoList);
  }

  return (
    <Container>
      <Resumo>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <span>Hora Inicio:</span>
            <KeyboardTimePicker
              value={horaInicio}
              onChange={(dt) => setHoraInicio(dt)}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </li>
          <li>
            <span>Total Lançado:</span>
            {totalLancado}
          </li>
          <li>
            <span>Última hora lançada:</span>
            {horaFinalFormatted}
          </li>
          <li>
            <span>Total OS trabalhada:</span>
            {totalOS}
          </li>
        </ul>
        {/* <button type="button" onKeyPress={() => handleLimpar()}>
          Limpar
        </button> */}
        <button type="button" onClick={() => handleUnblockEdit()}>
          Desbloquear ediçao para todos
        </button>
      </Resumo>
      <ListaLancamento>
        <h1>Lista de lancamentos</h1>
        {lancamentoList.length === 0 && <span>Não há lancamentos</span>}
        {lancamentoList.map((lancamento) => (
          <LancamentoItem
            key={lancamento.id}
            tarefaEvolutiva={lancamento.tarefaEvolutiva}
            copied={lancamento.copied}
          >
            <span>lancado em:{lancamento.horaFormatted} -</span>
            <span>
              {lancamento.intervalo}m ={'> '} {lancamento.minutesConverted} -
            </span>
            <span>OS#{lancamento.os} - </span>
            <span>{lancamento.sistema} - </span>
            <span>{lancamento.acao}</span>
            <button
              type="button"
              onClick={() => handleEdit(lancamento)}
              disabled={lancamento.copied}
            >
              Edit
            </button>
            <button type="button" onClick={() => handleCopy(lancamento)}>
              {lancamento.tarefaEvolutiva ? 'Copy to Redmine' : 'Copy to OS'}
            </button>
            <button type="button" onClick={() => handleDelete(lancamento)}>
              Remover
            </button>
          </LancamentoItem>
        ))}
        <div className="container-new">
          <div className="container-first-line">
            <input
              type="Number"
              value={newLancamento.intervalo}
              placeholder="Minutos gastos na tarefa"
              onChange={(e) =>
                setNewLancamento({
                  ...newLancamento,
                  intervalo: e.target.value,
                })
              }
            />
            <Checkbox
              label="Tarefa evolutiva"
              checked={newLancamento.tarefaEvolutiva}
              onChange={(_) =>
                setNewLancamento({
                  ...newLancamento,
                  tarefaEvolutiva: !newLancamento.tarefaEvolutiva,
                })
              }
            />
          </div>
          <AsyncCreatableSelect
            className="createOS"
            isClearable
            createOptionPosition="first"
            allowCreateWhileLoading
            value={osSelected}
            loadOptions={promiseOSSelect}
            onChange={(newV, action) => handleChangeOS(newV, action)}
          />
          <AsyncCreatableSelect
            className="createOS"
            isClearable
            createOptionPosition="first"
            allowCreateWhileLoading
            value={sistemaSelected}
            loadOptions={promiseSistemaSelect}
            onChange={(newV, action) => handleChangeSistema(newV, action)}
          />
          <textarea
            type="text"
            value={newLancamento.acao}
            placeholder="Ação realizada"
            onChange={(e) =>
              setNewLancamento({ ...newLancamento, acao: e.target.value })
            }
          />
          <button type="button" onClick={(e) => handleLancar(e)}>
            Lançar
          </button>
          <button type="button" onClick={(e) => handleCancelar(e)}>
            Cancelar
          </button>
        </div>
      </ListaLancamento>
    </Container>
  );
}

export default Dashboard;
