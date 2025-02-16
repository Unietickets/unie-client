import * as S from './styles';

// FIXME нужно поправить расположение фото во враппере
export function PhotoItem(props) {
  const {
    file,
    fetchFiles,
    setFiles,
    label
  } = props;
  return (
    <S.ListItem>
      {file?.originalFileName && (
        <S.Title>
          {file.originalFileName}
        </S.Title>
      )}

      <S.ImageWrapper>
        {label && (
          <S.ImageLabel label={label}/>
        )}
        {/* {file?.fileSize && (
          <S.SubTitle>
            {file.fileSize}
          </S.SubTitle>
        )} */}

        {file && file?.url && (
            <S.Image
              src={file.url}
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
