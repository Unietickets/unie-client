'use server'

import * as Minio from 'minio'

let s3Client;

/** Получение клиента MinIO */
export async function initializeS3Client() {
  if (!s3Client) {
    s3Client = new Minio.Client({
      endPoint: process.env.S3_ENDPOINT,
      port: process.env.S3_PORT ? Number(process.env.S3_PORT) : undefined,
      accessKey: process.env.S3_ACCESS_KEY,
      secretKey: process.env.S3_SECRET_KEY,
      useSSL: process.env.S3_USE_SSL === 'true',
    });
  }
  return s3Client;
}

/**
 * Проверка существования бакета, если его нет - создание
 * @param bucketName name of the bucket
 * @returns void
 */
export async function createBucketIfNotExists(bucketName) {
  const client = await initializeS3Client();
  const bucketExists = await client.bucketExists(bucketName);
  if (!bucketExists) {
    await client.makeBucket(bucketName);
  }
}

/**
 * Генерация presigned URL для загрузки файлов в S3
 * @param files файлы для загрузки
 * @returns Promise<string[]> с presigned URL-ами
 */
export async function createPresignedUrlToUpload({
  bucketName,
  fileName,
  expiry = 60 * 60, // 1 hour
}) {
  await createBucketIfNotExists(bucketName);

  const client = await initializeS3Client();
  return await client.presignedPutObject(bucketName, fileName, expiry);
}

/**
 * Получение presigned URL для загрузки файла из S3
 * @param bucketName Название бакета
 * @param fileName Имя файла
 * @param expiry Время жизни URL в секундах
 * @returns Promise<string> Presigned URL
 */
export async function createPresignedUrlToDownload({
  bucketName,
  fileName,
  expiry = 60 * 60, // 1 hour
}) {
  const client = await initializeS3Client();

  return await client.presignedGetObject(bucketName, fileName, expiry);
}
