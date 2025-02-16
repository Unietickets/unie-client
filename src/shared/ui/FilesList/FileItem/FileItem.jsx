import * as S from './styles';

// FIXME нужно поправить расположение фото во враппере
export function FileItem(props) {
  const {
    file,
    fetchFiles,
    setFiles,
    fileUrl
  } = props;
  return (
    <S.ListItem>
      {file?.originalFileName && (
        <S.Title>
          {file.originalFileName}
        </S.Title>
      )}

      <S.ImageWrapper>
        {file?.fileSize && (
          <S.SubTitle>
            {file.fileSize}
          </S.SubTitle>
        )}

        {fileUrl && (
            <S.Image
              src={fileUrl}
              alt={file.originalFileName}
            />
          )}

        <S.DeleteButton
          size='small'
          // onClick={() => deleteFile(file.id)}
          disabled={file?.isDeleting}
          isLoading={file?.isDeleting}
          >
          Delete
          </S.DeleteButton>
        </S.ImageWrapper>

      {file?.isDeleting && (
        <S.SubTitle>
          Deleting...
        </S.SubTitle>
      )}
    </S.ListItem>
  )
}
