import React, { useState } from 'react';

import { Container, Resumo, ListaLancamento } from './styles';

function Dashboard() {
  const [lancamentoList, setLancamentoList] = useState([
    { id: 1, acao: 'teste' },
  ]);

  return (
    <Container>
      <Resumo>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <span>Total horas:</span>
            {8}h
          </li>
          <li>
            <span>Total OS:</span>
            {2}
          </li>
        </ul>
      </Resumo>
      <ListaLancamento>
        <h1>Lista de lancamentos</h1>
        {lancamentoList.lenght === 0 && <span>Não há lancamentos</span>}
        {lancamentoList.map((lancamento) => (
          <div key={lancamento.id}>
            <span>15:00 - </span>
            <span>16:00 - </span>
            <span>1h - </span>
            <span>OS#1234 - </span>
            <span>{lancamento.acao}</span>
          </div>
        ))}
      </ListaLancamento>
    </Container>
  );
}

export default Dashboard;
