'use client'

import React from 'react';
import { components } from 'react-select';
import moment from 'moment';

import * as S from './Option.styles';

export const SingleValue = (props) => {
  const { data } = props;
  
  return (
    <components.SingleValue {...props}>
      <S.OptionContainer style={{ padding: '0px' }}>
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
        {data.date && <S.OptionDate>{moment(data.date).format('DD.MM.YYYY')}</S.OptionDate>}
      </S.OptionContainer>
    </components.SingleValue>
  );
};
