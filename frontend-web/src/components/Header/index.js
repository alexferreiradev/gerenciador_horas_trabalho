import React from 'react';

import { Container } from './styles';

function Header() {
  return (
    <Container>
      <span>{process.env.REACT_APP_NAME}</span>
    </Container>
  );
}

export default Header;
