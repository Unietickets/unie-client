'use client';

import { useEffect, useRef } from "react";
import { Button } from "../Button";

import * as S from './styles';

export function FileUploader({
  isLoading,
  fileInputRef,
  uploadToServer,
  maxFileSize,
  onChange,
  files,
  name
}) {
  useEffect(() => {
    if (fileInputRef.current && files.length > 0) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => {
        // Если это File объект, используем его напрямую
        if (file instanceof File) {
          dataTransfer.items.add(file);
        }
        // Если это наш кастомный объект с url, нужно создать новый File
        else if (file.lastModified && file.name) {
          const newFile = new File([file], file.name, {
            type: file.type,
            lastModified: file.lastModified
          });
          dataTransfer.items.add(newFile);
        }
      });
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [files, fileInputRef]);

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
