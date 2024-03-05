import React from 'react';

import { Container } from './styles';
import Icon from './Icon';

function Header() {
  return (
    <Container>
      <Icon />
      <span>{process.env.REACT_APP_NAME}</span>
    </Container>
  );
}

export default Header;
