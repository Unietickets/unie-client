import { FileItem } from "./FileItem";
import * as S from "./styles";

export function FilesList({ files = [], fetchFiles, setFiles, downloadUsingPresignedUrl }) {
  if (files.length === 0) {
    return null;
  }

  return (
    <>
      <S.Caption>
        Uploaded photos:
      </S.Caption>
      <S.Wrapper>
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            fetchFiles={fetchFiles}
            setFiles={setFiles}
            downloadUsingPresignedUrl={downloadUsingPresignedUrl}
            fileUrl={file?.url}
          />
        ))}
      </S.Wrapper>
    </>
  );
}
