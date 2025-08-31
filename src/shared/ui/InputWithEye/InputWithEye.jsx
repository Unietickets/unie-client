'use client';

import { useState } from 'react';

import { toggleInputFieldType } from '@/shared/lib';

import { Input } from '../Input';

import * as S from './InputWithEye.styles';

export const InputWithEye = (props) => {
  const { id } = props;
  const [type, setType] = useState(props.type || 'password');

  const handleClick = () => {
    toggleInputFieldType(id);
    setType(type === 'password' ? 'text' : 'password');
  }

  return (
    <S.Wrapper>
      <Input
        {...props}
        type={type}
      />
      {type === 'password' && <S.ClosedEye onClick={handleClick} />}
      {type === 'text' && <S.OpenedEye onClick={handleClick} />}
    </S.Wrapper>
  );
};

Input.displayName = 'Input';
