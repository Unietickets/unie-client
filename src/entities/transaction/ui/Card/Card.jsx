import React from 'react';

import { Accordion } from '@/shared/ui';

import * as S from './styles';

const TransactionTitles = {
  ticket: {
    income: 'Sell',
    outcome: 'Buy',
  },
  money: {
    income: 'Deposit',
    outcome: 'Withdraw',
  },
}

export const Card = ({ data }) => {
  if (data == null) {
    return null;
  }

  const {
    Icon,
    item,
    sum,
    transaction_date,
    status,
    eventName = 'name'
  } = data;

  return (
    <Accordion>
      <Accordion.Header>
        {({ isOpen }) => (
          <>
            <S.HalfBlock gap={24}>
              {Icon && <Icon />}
              <S.Title>{TransactionTitles[item.type][sum.type]}</S.Title>
            </S.HalfBlock>
            <S.HalfBlock justifyContent='space-between'>
              <S.Sum type={sum.type}>
                {sum.type === 'income' ? '+' : '-'}
                {' '}
                {sum.value}
                {' '}
                {sum.currency}
              </S.Sum>
              <S.Arrow isOpen={isOpen} />
            </S.HalfBlock>
          </>
        )}
      </Accordion.Header>
      <Accordion.Details>
        <S.DetailsRow>
          <S.HalfBlock>
            <S.DetailCaption>{eventName}</S.DetailCaption>
          </S.HalfBlock>
          <S.HalfBlock>
            <S.DetailCaption>{transaction_date}</S.DetailCaption>
          </S.HalfBlock>
        </S.DetailsRow>
        <S.DetailsRow>
          <S.HalfBlock>
            <S.Status status={status}>
              <svg height={6} width={6} viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="3" />
              </svg>
              {status}
            </S.Status>
          </S.HalfBlock>
          <S.HalfBlock>
            <S.DetailCaption accent>Need Help?</S.DetailCaption>
          </S.HalfBlock>
        </S.DetailsRow>
      </Accordion.Details>
    </Accordion>
  );
};
