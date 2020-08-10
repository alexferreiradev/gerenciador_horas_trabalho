import React from 'react';

import { Container, Resumo, ListaLancamento } from './styles';

function Dashboard() {
  return (
    <Container>
      <Resumo>Resumo de dados</Resumo>
      <ListaLancamento>Lista de lancamentos</ListaLancamento>
    </Container>
  );
}

export default Dashboard;
