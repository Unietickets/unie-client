'use client';

import * as S from './styles';

export function FileUploader({
  isLoading,
  fileInputRef,
  onChange,
  name,
}) {
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
          <>
            <label htmlFor='file'>File</label>
            <S.FileInput
              id='file'
              type='file'
              name={name}
              ref={fileInputRef}
              onChange={onChange}
            />
          </>
      )}
    </>
  )
}
