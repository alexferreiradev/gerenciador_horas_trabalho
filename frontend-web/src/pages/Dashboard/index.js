import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as clipboard from 'clipboard-polyfill/text';
import { addMinutes } from 'date-fns';
import { KeyboardTimePicker } from '@material-ui/pickers';
import AsyncSelect from 'react-select/async';

import { formatHoraLancamento, formatHoraMinuto } from '../../util/index';

import { Container, Resumo, ListaLancamento } from './styles';

function Dashboard() {
  const [lancamentoList, setLancamentoList] = useState([]);
  const [newLancamento, setNewLancamento] = useState({});
  const [editing, setEditing] = useState(false);
  const [horaInicio, setHoraInicio] = useState(new Date());
  const emptyLancamento = { os: '', acao: '', intervalo: '', sistema: '' };

  const totalIntervalo = useMemo(() => {
    return (
      lancamentoList.reduce(
        (acc, current) => acc + Number.parseInt(current.intervalo, 10),
        0
      ) || 0
    );
  }, [lancamentoList]);
  const totalLancado = useMemo(() => {
    const horas = totalIntervalo / 60;
    const hora = Number.parseInt(horas, 10);
    const minuto = Math.round((horas - hora).toFixed(2) * 60);
    return `${hora}h, ${minuto}m`;
  }, [totalIntervalo]);
  const horaFinal = useMemo(() => {
    return addMinutes(horaInicio, totalIntervalo);
  }, [totalIntervalo, horaInicio]);
  const horaFinalFormatted = useMemo(() => {
    return `${formatHoraMinuto(horaFinal)}`;
  }, [horaFinal]);
  const horaInicioFormatted = useMemo(() => formatHoraMinuto(horaInicio), [
    horaInicio,
  ]);

  useEffect(() => {
    function saveInStorage() {
      if (lancamentoList && lancamentoList.length > 0) {
        localStorage.setItem('lancamentos', JSON.stringify(lancamentoList));
      }
    }

    saveInStorage();
  }, [lancamentoList]);

  useEffect(() => {
    function loadFromStorage() {
      const lancamentoListJson = localStorage.getItem('lancamentos');
      const lancamentoListParsed = JSON.parse(lancamentoListJson);
      if (lancamentoListParsed && lancamentoListParsed.length > 0) {
        setLancamentoList(lancamentoListParsed);
      } else {
        setLancamentoList([
          {
            id: 1,
            acao: 'inicio trabalho',
            hora: new Date(),
            horaFormatted: formatHoraLancamento(new Date()),
            intervalo: '15',
            sistema: 'CRM',
            os: '123',
          },
        ]);
      }
    }

    loadFromStorage();
  }, []);

  function newLancamentoInvalid() {
    const { intervalo } = newLancamento;
    if (intervalo == null || Number.isNaN(Number.parseInt(intervalo, 10)))
      return true;
    if (newLancamento.os == null) return true;
    if (newLancamento.sistema == null) return true;
    if (newLancamento.acao == null) return true;

    return false;
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
      };
      newList[lacamentoIndex] = newLancamentoModel;
      setLancamentoList(newList);
      toast.success('Lancamento atualizado');
    } else {
      toast.error('Lancamento não foi encontrado');
    }
  }

  function handleLancar() {
    if (newLancamentoInvalid()) {
      toast.warn('Preenchimento incorreto');
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
      };
      setLancamentoList([...lancamentoList, newLancamentoModel]);
      setNewLancamento(emptyLancamento);
      toast.success('Lancamento feito com sucesso');
    }
  }

  function handleEdit(lancamentoEditing) {
    setNewLancamento(lancamentoEditing);
    setEditing(true);
  }

  function handleCopy(lancamento) {
    clipboard.writeText(lancamento.acao);
    toast.success('Acao copiada para área de transferência');
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

  function handleLimpar() {}

  function handleCancelar() {
    setNewLancamento(emptyLancamento);
    setEditing(false);
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
            <span>Total horas:</span>
            {totalLancado}
          </li>
          <li>
            <span>Última hora lançada:</span>
            {horaFinalFormatted}
          </li>
          <li>
            <span>Total OS:</span>
            {2}
          </li>
        </ul>
      </Resumo>
      <ListaLancamento>
        <button type="button" onClick={() => handleLimpar()}>
          Limpar
        </button>
        <h1>Lista de lancamentos</h1>
        {lancamentoList.length === 0 && <span>Não há lancamentos</span>}
        {lancamentoList.map((lancamento) => (
          <div key={lancamento.id}>
            <span>
              {lancamento.horaFormatted} {'=>'}{' '}
            </span>
            <span>{lancamento.intervalo}m - </span>
            <span>OS#{lancamento.os} - </span>
            <span>OS#{lancamento.sistema} - </span>
            <span>{lancamento.acao}</span>
            <button type="button" onClick={() => handleEdit(lancamento)}>
              Edit
            </button>
            <button type="button" onClick={() => handleCopy(lancamento)}>
              Copy
            </button>
            <button type="button" onClick={() => handleDelete(lancamento)}>
              Remover
            </button>
          </div>
        ))}
        <div>
          <input
            type="text"
            value={newLancamento.intervalo}
            placeholder="Minutos gastos na tarefa"
            onChange={(e) =>
              setNewLancamento({ ...newLancamento, intervalo: e.target.value })
            }
          />
          <input
            type="text"
            value={newLancamento.os}
            placeholder="número da OS"
            onChange={(e) =>
              setNewLancamento({ ...newLancamento, os: e.target.value })
            }
          />
          <input
            type="text"
            value={newLancamento.sistema}
            placeholder="Sistema"
            onChange={(e) =>
              setNewLancamento({ ...newLancamento, sistema: e.target.value })
            }
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
