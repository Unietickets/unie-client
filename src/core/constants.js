export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME ?? "S3_BUCKET_NAME"
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? "NEXTAUTH_SECRET"
export const MODE = process.env.MODE ?? "development"
export const S3_ENDPOINT = process.env.S3_ENDPOINT ?? "kubernetes.docker.internal"
export const S3_PORT = process.env.S3_PORT ? Number(process.env.S3_PORT) : 9000
export const S3_ROOT_USER = process.env.S3_ROOT_USER ?? ""
export const S3_ROOT_PASSWORD = process.env.S3_ROOT_PASSWORD ?? ""
export const ORIGIN = process.env?.HOST ? `${process.env.HOST}:${process.env.PORT}` : 'http://localhost:3000';
