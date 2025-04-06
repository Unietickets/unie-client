'use client'

import React from 'react';

import { FullInfo, TicketList } from "@entities/event";

import * as S from "./styles";

export const EventView = (props) => {
  const { event, tickets } = props;

  return (
    <S.Wrapper>
      {event && <FullInfo event={event} />}
      {tickets.length > 0 && <TicketList tickets={tickets} />}
    </S.Wrapper>
  )
};
