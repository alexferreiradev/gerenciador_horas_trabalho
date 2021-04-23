import React, { useState } from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { Checkbox } from 'semantic-ui-react';
import AsyncCreatableSelect from 'react-select/async-creatable';

import useFuncoes from './useFuncoes';
import useEffects from './useEffects';
import useMemos from './useMemos';
import Constantes from './Constantes';

import { Container, Resumo, ListaLancamento, LancamentoItem } from './styles';

function Dashboard() {
  const [lancamentoList, setLancamentoList] = useState([]);
  const [newLancamento, setNewLancamento] = useState(
    Constantes.emptyLancamento
  );
  const [osSelected, setOsSelected] = useState({ value: '', label: '' });
  const [sistemaSelected, setSistemaSelected] = useState({
    value: '',
    label: '',
  });
  const [editing, setEditing] = useState(false);
  const [horaInicio, setHoraInicio] = useState();

  useEffects({
    lancamentoList,
    horaInicio,
    newLancamento,
    setOsSelected,
    setSistemaSelected,
    setLancamentoList,
    setHoraInicio,
  });

  const {
    totalTempoCorretiva,
    totalTempoEvolutiva,
    totalLancado,
    horaFinalFormatted,
    totalOS,
    osSelectList,
    sistemaSelectList,
  } = useMemos({ lancamentoList, horaInicio });

  const {
    handleCancelar,
    handleLancar,
    handleEdit,
    handleCopy,
    handleDelete,
    handleLimpar,
    promiseOSSelect,
    handleChangeOS,
    promiseSistemaSelect,
    handleChangeSistema,
    handleUnblockEdit,
  } = useFuncoes({
    setNewLancamento,
    setEditing,
    setOsSelected,
    setLancamentoList,
    newLancamento,
    lancamentoList,
    sistemaSelectList,
    editing,
    osSelectList,
  });

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
          <li>
            <span>Total corretivas trabalhada:</span>
            {totalTempoCorretiva}
          </li>
          <li>
            <span>Total evolutivas trabalhada:</span>
            {totalTempoEvolutiva}
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
            <Checkbox
              label="Intervalo ?"
              checked={newLancamento.isIntervalo}
              onChange={(_) =>
                setNewLancamento({
                  ...newLancamento,
                  isIntervalo: !newLancamento.isIntervalo,
                })
              }
            />
          </div>
          <div hidden={newLancamento.isIntervalo}>
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
          </div>
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
