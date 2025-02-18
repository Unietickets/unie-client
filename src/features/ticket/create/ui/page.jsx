'use client';

import React, { useState } from 'react';

import * as S from './styles';

import { PhotoUploader } from '@/entities/file';
import { useAuth } from '@/shared/lib';

const page = ({ user, availableEvents }) => {
  console.log(user)
  console.log(availableEvents)
  const [previewFiles, setPreviewFiles] = useState([]);
  const AuthWrapper = useAuth();

  return (
    <AuthWrapper>
      <S.Wrapper>
        <PhotoUploader files={previewFiles} setFiles={setPreviewFiles}/>
      </S.Wrapper>
    </AuthWrapper>
  );
};

export default page;
