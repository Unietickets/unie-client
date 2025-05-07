import React from 'react';

import { Container } from '@/shared/ui';

const layout = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default layout;
