import React from 'react';

import { TransactionCard } from '../Card';

import * as S from './styles';

export const CardsList = ({ transactions }) => {
  if (transactions.length === 0) {
    return null;
  }
  
  return (
    <S.Wrapper>
      {transactions.map(card => (
        <TransactionCard key={card.id} data={card}/>
      ))}
    </S.Wrapper>
  );
};
