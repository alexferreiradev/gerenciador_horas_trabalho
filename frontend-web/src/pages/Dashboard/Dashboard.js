import React, { useState } from 'react';
import { TimePicker } from '@material-ui/pickers';
import { Button, Checkbox, Input, Modal } from 'semantic-ui-react';
import AsyncCreatableSelect from 'react-select/async-creatable';

import useFuncoes from './useFuncoes';
import useEffects from './useEffects';
import useMemos from './useMemos';
import Constantes from './Constantes';

import {
  Container,
  LancamentoItem,
  ListaLancamento,
  Resumo,
  NewBt,
} from './styles';

import Hint from '../../components/Hint';


function Dashboard() {
  const [lancamentoList, setLancamentoList] = useState([]);
  const [newLancamento, setNewLancamento] = useState(
    Constantes.emptyLancamento
  );
  const [editing, setEditing] = useState(false);
  const [horaInicio, setHoraInicio] = useState();
  const [isAlterBHOpen, setIsAlterBHOpen] = useState(false);
  const [totalMinutesBH, setTotalMinutesBH] = useState(0);
  const [totalMinutosBHInput, setTotalMinutosBHInput] = useState(
    totalMinutesBH
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [lancamentoToDelete, setLancamentoToDelete] = useState({});
  const [exportingJSON, setExportingJSON] = useState(false);
  const [isConfirmStartDayShowing, setConfirmStartDayShowing] = useState(false);

  useEffects({
    lancamentoList,
    horaInicio,
    newLancamento,
    totalMinutesBH,
    setLancamentoList,
    setHoraInicio,
    setTotalMinutesBH,
    setCurrentTime,
    setTotalMinutosBHInput,
    exportingJSON,
    setExportingJSON,
  });

  const {
    totalTempoCorretiva,
    totalTempoEvolutiva,
    totalLancado,
    horaFinalFormatted,
    totalOS,
    osSelectList,
    totalBH,
    currentHour,
    exportState,
    osSelected,
  } = useMemos({
    lancamentoList,
    horaInicio,
    totalMinutesBH,
    currentTime,
    exportingJSON,
    newLancamento,
    editing,
  });

  const {
    handleCancelar,
    handleLancar,
    handleEdit,
    handleCopy,
    handleDelete,
    promiseOSSelect,
    handleChangeOS,
    handleUnblockEdit,
    handleUpdateBH,
    handleExportJson,
    handleStartDay,
  } = useFuncoes({
    setNewLancamento,
    setEditing,
    setLancamentoList,
    newLancamento,
    lancamentoList,
    editing,
    osSelectList,
    setIsAlterBHOpen,
    setTotalMinutesBH,
    setExportingJSON,
    setConfirmStartDayShowing,
  });

  return (
    <Container>
      <Resumo>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <span>Hora Inicio:</span>
            <TimePicker
              value={horaInicio}
              onChange={(dt) => {
                setHoraInicio(dt)
              }}
              PopoverProps={{
                'aria-label': 'change time',
              }}
            />
            <Hint hint='horaInicio' />
          </li>
          <li>
            <span>Total Lançado:</span>
            {totalLancado}
            <Hint hint='totalLancado' />
          </li>
          <li>
            <span>Última hora lançada:</span>
            {horaFinalFormatted}
            <Hint hint='ultimaHora' />
          </li>
          <li>
            <span>Hora atual:</span>
            {currentHour}
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
          <li>
            <span>Total no Banco de Horas<Hint hint='bancoHoras' />:</span>
            {totalBH}
            <Button
              icon="edit"
              onClick={() => setIsAlterBHOpen(true)}
              size="mini"
              compact
            />
          </li>
        </ul>
        <button type="button" onClick={() => handleUnblockEdit()}>
          Desbloquear ediçao para todos
          <Hint hint='desbloquearTodos' />
        </button>
        <Button
          icon={exportState.icon}
          onClick={() => handleExportJson()}
          content={exportState.label}
        />
        <Button
          secondary
          icon="sync alternate"
          onClick={() => handleStartDay(isConfirmStartDayShowing)}
        >Iniciar Dia<Hint hint='iniciarDia' /></Button>
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
            <div className="infos">
              <span>lancado em:{lancamento.horaFormatted} -</span>
              <span>
                {lancamento.intervalo}m ={'> '} {lancamento.minutesConverted} -
              </span>
              <div hidden={lancamento.isIntervalo}>
                <span>OS#{lancamento.os} - </span>
              </div>
              <span>{lancamento.acao}</span>
            </div>
            <div className="acoes">
              <button
                type="button"
                onClick={() => handleEdit(lancamento)}
                disabled={lancamento.copied}
              >
                Edit (e)
              </button>
              <button type="button" onClick={() => handleCopy(lancamento)}>
                {lancamento.textoBotaoAcao}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLancamentoToDelete(lancamento);
                  setConfirmDeleteOpen(true);
                }}
              >
                Remover
              </button>
            </div>
          </LancamentoItem>
        ))}
        <div className="container-new"
          onKeyPress={(e) => {
            if (e.ctrlKey && e.key === 'Enter') {
              handleLancar(e)
            }
          }}
        >
          <div className="container-first-line">
            <input
              type="Number"
              id="input-minutos"
              value={newLancamento.intervalo}
              placeholder="Minutos gastos na tarefa"
              onChange={(e) =>
                setNewLancamento({
                  ...newLancamento,
                  intervalo: e.target.value,
                })
              }
              onKeyPress={(e) => {
                if (e.key === 'e') {
                  const lastLancamento = lancamentoList[lancamentoList.length - 1];
                  handleEdit(lastLancamento);
                  e.preventDefault();
                }
              }}
            />
            <Hint hint='minutosGastos' />
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
              label="Intervalo"
              checked={newLancamento.isIntervalo}
              onChange={(_) =>
                setNewLancamento({
                  ...newLancamento,
                  isIntervalo: !newLancamento.isIntervalo,
                })
              }
            />
            <Hint hint='intervalo' />
          </div>
          <span>Última hora lançada: {horaFinalFormatted}<Hint hint='ultimaHora' /></span>
          <div hidden={newLancamento.isIntervalo}>
            <AsyncCreatableSelect
              className="createOS"
              isClearable
              createOptionPosition="first"
              placeholder="Tarefa que trabalhou"
              value={osSelected}
              loadOptions={promiseOSSelect}
              onChange={(newV, action) => handleChangeOS(newV, action)}
            />
            <textarea
              value={newLancamento.acao}
              placeholder="Digite a ação realizada e depois utilize 'Ctrl + Enter' para lançar"
              onChange={(e) =>
                setNewLancamento({ ...newLancamento, acao: e.target.value })
              }
            />
            <Hint hint='textoLancamento' />
          </div>
          <NewBt color="black" onClick={(e) => handleLancar(e)}>
            Lançar
          </NewBt>
          <NewBt onClick={(e) => handleCancelar(e)}>Cancelar</NewBt>
        </div>
      </ListaLancamento>
      <Modal open={isAlterBHOpen}>
        <Modal.Header>Alteração de Banco de Horas</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Altere o Banco de Horas com os minutos desejados
          </Modal.Description>
          <Input
            type="number"
            value={totalMinutosBHInput}
            onChange={(e) => setTotalMinutosBHInput(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsAlterBHOpen(false)}>Cancelar</Button>
          <Button onClick={() => handleUpdateBH(totalMinutosBHInput)}>
            Alterar
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal open={isConfirmDeleteOpen}>
        <Modal.Header>Confirma a remoção do lançamento</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Você realmente deseja remover este lançamento ?
            <br />
            <br />
            <span>Número tarefa: </span>
            <b>{lancamentoToDelete?.os}</b>
            <br />
            <span>Ação: </span>
            <b>{lancamentoToDelete?.acao}</b>
            <br />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancelar</Button>
          <Button
            color="red"
            onClick={() => {
              setConfirmDeleteOpen(false);
              handleDelete(lancamentoToDelete);
            }}
          >
            Remover
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal open={isConfirmStartDayShowing}>
        <Modal.Header>Confirma o início de dia</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Esta ação irá remover todos lançamentos, inclusive bloqueados, e não
            poderá ser desfeita. Gostaria de continuar ?
            <br />
            <br />
            <span>Total de lançamentos a ser removido: </span>
            <b>{lancamentoList?.length}</b>
            <br />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setConfirmStartDayShowing(false)}>
            Cancelar
          </Button>
          <Button
            color="red"
            onClick={() => {
              handleStartDay(isConfirmStartDayShowing);
            }}
          >
            Iniciar o dia
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}

export default Dashboard;
