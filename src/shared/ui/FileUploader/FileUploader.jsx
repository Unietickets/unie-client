import { Button } from "../Button";

import * as S from './styles';

export function FileUploader({
  isLoading,
  fileInputRef,
  uploadToServer,
  maxFileSize
}) {
  return (
    <S.Form onSubmit={uploadToServer}>
      {isLoading ? (
        <>Loading...</>
      ) : (
          <>
            <S.FileInput
              id='file'
              type='file'
              multiple
              required
              ref={fileInputRef}
            />
            <Button
              variant='primary'
              size='medium'
              type='submit'
              disabled={isLoading}
            >
              Upload
            </Button>
          </>
      )}
    </S.Form>
  )
}
