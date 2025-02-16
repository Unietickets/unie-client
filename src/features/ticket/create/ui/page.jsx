import React from 'react';

import * as S from './styles';

import { PhotoUploader } from '@/entities/file';

const page = () => {
  return (
    <S.Wrapper>
      <PhotoUploader />
    </S.Wrapper>
  );
};

export default page;
