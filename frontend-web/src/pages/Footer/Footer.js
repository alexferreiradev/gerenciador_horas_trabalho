import React from 'react';

import { Container } from './styles';

function Footer() {
  return (
    <Container>
      <div>
        Criado com &#9825; por <a href="https://www.alexferreira.dev">Alex</a>
      </div>
      <div>
        Contribua com o projeto pelo{' '}
        <a href="https://github.com/alexferreiradev/gerenciador_horas_trabalho">
          GitHub
        </a>
      </div>
      <div>Versão: {process.env.REACT_APP_VERSION}</div>
    </Container>
  );
}

export default Footer;
