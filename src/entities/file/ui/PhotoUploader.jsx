'use client'

import { useState, useRef } from 'react'

import { FileUploader, PhotosList } from '@shared/ui'

import * as fileService from '../services'

const MAX_FILE_SIZE_S3_ENDPOINT = 5 * 1024 * 1024;

export function PhotoUploader({ files, setFiles }) {
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  // const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFileDelete = (file) => {
    setFiles(files.filter((f) => f.name !== file.name));
  }

  // сетим файлы для превью
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const filesWithUrls = selectedFiles.map((file) => {

      return ({
        lastModified: file.lastModified,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath,
        url: URL.createObjectURL(file),
      })
    });

    setFiles(filesWithUrls);
  }

  // грузим фото на сервер
  const uploadToServer = async (event) => {
    event.preventDefault()
    // get File[] from FileList
    const newFiles = Object.values(fileInputRef.current.files)

    // validate files
    const filesInfo = newFiles.map((file) => ({
      originalFileName: file.name,
      fileSize: file.size,
    }))

    const presignedUrls = await fileService.getPresignedUrls(filesInfo)

    // upload files to s3 endpoint directly and save file info to db
    const filesInfoAfterSuccessLoad = await fileService.saveFilesToS3AndDB(newFiles, presignedUrls)

    const filesWithUrls = await Promise.all(filesInfoAfterSuccessLoad.map(async (file) => ({
      ...file,
      url: await fileService.getFileLinkById(file.id)
    })))

    setFiles(filesWithUrls)
    // setUploadedFiles(filesWithUrls)

    setIsLoading(false)
  }

  return (
    <>
      <FileUploader
        isLoading={isLoading}
        fileInputRef={fileInputRef}
        uploadToServer={uploadToServer}
        onChange={handleFileChange}
        maxFileSize={MAX_FILE_SIZE_S3_ENDPOINT}
      />
      <PhotosList files={files} label='preview' onDelete={handleFileDelete}/>
      {/* TODO удалить */}
      {/* вряд ли здесь будет отобраться список загруженных на сервер фото */}
      {/* <PhotosList files={uploadedFiles} label='uploaded' onDelete={handleFileDelete}/> */}
    </>
  )
}
