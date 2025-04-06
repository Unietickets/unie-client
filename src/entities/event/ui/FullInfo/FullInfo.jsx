import React from 'react';

import { TagGroup, TAG_VARIANTS } from '@/shared/ui';

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
        <TagGroup>
          {event.metadata?.map((item) => (
            <TagGroup.Tag
              key={item.name}
              variant={TAG_VARIANTS.NOTE}
              isAccent={item?.accent}
            >
              {item.value}
            </TagGroup.Tag>
          ))}
        </TagGroup>
        <S.Description>{event.description}</S.Description>
      </S.TextWrapper>
    </S.Wrapper>
  );
};
