import { PhotoItem } from "./PhotoItem";
import * as S from "./styles";

export function PhotosList({
  files = [],
  label,
  onDelete
}) {
  if (files.length === 0) {
    return null;
  }

  return (
    <>
      <S.Caption>
        {label === 'uploaded' ? 'Uploaded photos:' : 'Photos preview:'}
      </S.Caption>
      <S.Wrapper>
        {files.map((file) => (
          <PhotoItem
            key={file.fileName}
            file={file}
            label={label}
            onDelete={onDelete}
          />
        ))}
      </S.Wrapper>
    </>
  );
}
