'use client'

import { useState, useRef } from 'react'

import { FileUploader, PhotosList } from '@shared/ui'

import * as fileService from '../services'

const MAX_FILE_SIZE_S3_ENDPOINT = 5 * 1024 * 1024;

// грузим фото на сервер
export const uploadToServer = async (files) => {
  try {
    // validate files
    const filesInfo = files.map((file) => ({
      originalFileName: file.fileName,
      fileSize: file.size,
    }))

    const presignedUrls = await fileService.getPresignedUrls(filesInfo)
    console.log('upload to server', files, presignedUrls)

    // upload files to s3 endpoint directly and save file info to db
    const filesInfoAfterSuccessLoad = await fileService.saveFilesToS3AndDB(files, presignedUrls)

    const filesWithUrls = await Promise.all(filesInfoAfterSuccessLoad.map(async (file) => ({
      ...file,
      url: await fileService.getFileLinkById(file.id)
    })))

    return filesWithUrls;
  } catch (error) {
    console.error('Error uploading files:', error)
    return null;
  }
}

export function PhotoUploader({ files, setFiles, name, fileInputRef }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleFileDelete = (file) => {
    setFiles(files.filter((f) => f.name !== file.name));
  }

  // сетим файлы для превью
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const filesWithUrls = selectedFiles.map((file) => {
      return ({
        ...file,
        lastModified: file.lastModified,
        fileName: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath,
        url: URL.createObjectURL(file),
      })
    });

    setFiles(filesWithUrls);
  }

  return (
    <>
      <FileUploader
        isLoading={isLoading}
        fileInputRef={fileInputRef}
        onChange={handleFileChange}
        maxFileSize={MAX_FILE_SIZE_S3_ENDPOINT}
        files={files}
        name={name}
      />
      <PhotosList files={files} label='preview' onDelete={handleFileDelete}/>
    </>
  )
}
