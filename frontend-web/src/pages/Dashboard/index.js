import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as clipboard from 'clipboard-polyfill/text';
import { formatHoraLancamento } from '../../util/index';

import { Container, Resumo, ListaLancamento } from './styles';

function Dashboard() {
  const [lancamentoList, setLancamentoList] = useState([]);
  const [newLancamento, setNewLancamento] = useState({});
  const [editing, setEditing] = useState(false);

  const totalLancado = useMemo(() => {
    const totalIntervalo =
      lancamentoList.reduce((acc, current) => acc + current.intervalo, 0) || 0;
    const horas = totalIntervalo / 60;
    return horas.toFixed(2);
  }, [lancamentoList]);

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
      let idAux = 0;
      const lastLancamento = lancamentoList.find((i) => {
        if (i.id > idAux) {
          idAux = i.id;
          return true;
        }

        return false;
      });
      const lastId = lastLancamento ? lastLancamento.id : 1;
      const newLancamentoModel = {
        ...newLancamento,
        id: lastId + 1,
        hora: new Date(),
        horaFormatted: formatHoraLancamento(new Date()),
      };
      setLancamentoList([...lancamentoList, newLancamentoModel]);
      setNewLancamento({ os: '', acao: '', intervalo: '', sistema: '' });
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

  return (
    <Container>
      <Resumo>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <span>Total horas:</span>
            {totalLancado}h
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
            Lançado
          </button>
        </div>
      </ListaLancamento>
    </Container>
  );
}

export default Dashboard;
