import React from 'react';
import { toast } from 'react-toastify';
import * as clipboard from 'clipboard-polyfill/text';

import { convertIntervaloParaTempo, createObjetoLancamentoFrom } from './utils';
import Constantes from './Constantes';

export default function useFuncoes({
  setNewLancamento,
  setEditing,
  setOsSelected,
  setLancamentoList,
  newLancamento,
  lancamentoList,
  sistemaSelectList,
  editing,
  osSelectList,
  setIsAlterBHOpen,
  setTotalMinutesBH,
}) {
  function handleCancelar() {
    setNewLancamento(Constantes.emptyLancamento);
    setEditing(false);
    setOsSelected(undefined);
  }

  function valideOrToast() {
    // eslint-disable-next-line react/prop-types
    const MsgComponent = ({ msg }) => (
      <div>
        <h3>Preenchimento incorreto</h3>
        <span>{msg}</span>
      </div>
    );

    const { intervalo, isIntervalo } = newLancamento;
    let isInvalid = false;
    const msgErrorList = [];
    if (intervalo == null || Number.isNaN(Number.parseInt(intervalo, 10))) {
      isInvalid = isInvalid || true;
      msgErrorList.push(
        'Intervalo inválido. Deve ser um número que indique os minutos trabalhados na OS'
      );
    }

    if (!isIntervalo) {
      if (newLancamento.os == null) {
        isInvalid = isInvalid || true;
        msgErrorList.push('Descricao da tarefa inválida');
      }
      if (newLancamento.acao == null) {
        isInvalid = isInvalid || true;
        msgErrorList.push('Texto de ação é obrigatório');
      }
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
      newList[lacamentoIndex] = createObjetoLancamentoFrom(newLancamento, null);
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
      const newLancamentoModel = createObjetoLancamentoFrom(
        newLancamento,
        lastId
      );
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
      const msg = lancamento.isIntervalo
        ? 'Intervalo bloqueado'
        : 'Acao copiada para área de transferência';
      toast.success(msg);
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
      toast.success('Lançamento removido!');
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

  function handleUpdateBH(totalBHValue) {
    setIsAlterBHOpen(false);
    if (!totalBHValue) {
      console.error('Valor inserido para BH inválido');
      return;
    }

    setTotalMinutesBH(totalBHValue);
    console.info('Alterado BH para: ', totalBHValue);
  }

  return {
    convertIntervaloParaTempo,
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
    handleUpdateBH,
  };
}
