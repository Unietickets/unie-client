'use client'

import React, { useState } from 'react';

import { Switch } from '@/shared/ui';

import * as S from '../styles';

export const MyTickets = (props) => {
  const { tickets } = props;

  const [isActiveTickets, setIsActiveTickets] = useState(true);

  return (
    <>
      <S.SwitchItem>
      <S.SwitchLabel htmlFor="tickets-switch">Завершенные</S.SwitchLabel>
      <Switch
        id="tickets-switch"
        checked={isActiveTickets}
        onChange={(checked) => setIsActiveTickets(checked)}
      />
      <S.SwitchLabel htmlFor="tickets-switch">Активные</S.SwitchLabel>

    </S.SwitchItem>
    {isActiveTickets
      ? tickets?.active.map(t => <div key={t.id}>{t.id}</div>)
      : tickets?.inActive.map(t => <div key={t.id}>{t.id}</div>)}
    </>
  )
};
