'use client'

import React from 'react';
import { components } from 'react-select';

import * as S from './Option.styles';
import moment from 'moment';

export const Option = (props) => {
  const { data } = props;
  console.log('data', data)

  return (
    <components.Option {...props}>
      <S.OptionContainer style={{ backgroundColor: 'transparent' }}>
        <S.ImagePreview>
          <img
            src={data.image || '/placeholder-image.jpg'}
            alt={data.label}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </S.ImagePreview>
        <S.OptionName>{data.label}</S.OptionName>
        <S.OptionDate>{moment(data.date).format('DD.MM.YYYY')}</S.OptionDate>
      </S.OptionContainer>
    </components.Option>
  );
};