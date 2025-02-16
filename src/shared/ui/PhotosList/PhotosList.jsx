import { PhotoItem } from "./PhotoItem";
import * as S from "./styles";

export function PhotosList({ files = [], fetchFiles, setFiles, downloadUsingPresignedUrl, label }) {
  if (files.length === 0) {
    return null;
  }

  return (
    <>
      <S.Caption>
        {label === 'uploaded' ? 'Uploaded photos:' : 'Photos preview:'}
      </S.Caption>
      <S.Wrapper>
        {files.map((file, index) => (
            <PhotoItem
              key={file?.id ?? index}
              file={file}
              fetchFiles={fetchFiles}
              setFiles={setFiles}
              downloadUsingPresignedUrl={downloadUsingPresignedUrl}
              label={label}
            />
          ))}
      </S.Wrapper>
    </>
  );
}
