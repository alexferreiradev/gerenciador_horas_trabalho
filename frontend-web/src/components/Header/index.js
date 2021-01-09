import React from 'react';

import { Container } from './styles';

function Header() {
  return (
    <Container>
      <span>
        {process.env.REACT_APP_NAME} - {process.env.REACT_APP_VERSION}
      </span>
    </Container>
  );
}

export default Header;
