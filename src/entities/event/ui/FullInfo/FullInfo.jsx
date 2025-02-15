import React from 'react';

import * as S from './styles';

export const FullInfo = ({ event }) => {
  return (
    <S.Wrapper>
      <S.StyledEventCard>
        <S.ImageWrapper>
          <S.EventImage src={event.image} alt={event.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </S.ImageWrapper>
      </S.StyledEventCard>
      <S.TextWrapper>
        <S.Title>{event.title}</S.Title>
        <S.Description>{event.description}</S.Description>
      </S.TextWrapper>
    </S.Wrapper>
  );
};
