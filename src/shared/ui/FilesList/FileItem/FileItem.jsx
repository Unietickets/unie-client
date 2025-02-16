// import { formatBytes } from '~/utils/fileUploadHelpers'

import { Button } from '../../Button';

import * as S from './styles';

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

      <div className=' flex items-center gap-2'>
        {/* <span className='w-32 '>{formatBytes(file.fileSize)}</span> */}
        <S.SubTitle>
          {file.fileSize}
        </S.SubTitle>

        {fileUrl && <S.Image src={fileUrl} alt={file.originalFileName} />}

        <Button
          size='small'
          // onClick={() => deleteFile(file.id)}
          // onClick={() => deleteFile(file.id)}
          disabled={file?.isDeleting}
          isLoading={file?.isDeleting}
        >
          Delete
        </Button>
      </div>

      {file?.isDeleting && (
        <S.SubTitle>
          Deleting...
        </S.SubTitle>
      )}
    </S.ListItem>
  )
}
