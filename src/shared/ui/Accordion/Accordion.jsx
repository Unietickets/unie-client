'use client';

import React, { createContext, useContext, useState } from 'react';

import * as S from './Accordion.styles';

const context = createContext({ isOpen: false });
const useAccordion = () => useContext(context);

const AccordionRoot = ({ children, }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <context.Provider value={{ isOpen, setIsOpen }}>
      <S.Wrapper onClick={() => setIsOpen(prev => !prev)}>
        {children}
      </S.Wrapper>
    </context.Provider>
  );
};

const Header = ({ children }) => {
  const { isOpen, setIsOpen } = useAccordion();

  return (
    <S.Header>
      {children({ isOpen, setIsOpen })}
    </S.Header>
  )
};

const Details = ({ children }) => {
  const { isOpen } = useAccordion();

  if (!isOpen) {
    return null;
  }

  return (
    <S.Details>
      {children}
    </S.Details>
  )
}

export const Accordion = Object.assign(AccordionRoot, {
  Header,
  Details,
})
