export const validImageType = (file) => {
  // Define valid file types (e.g., image/jpeg, image/png)
  console.log(file)
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return validTypes.includes(file.type);
};

export const returnFileSize = (size) => {
  // Convert file size to a more readable format
  if (size < 1024) return `${size} bytes`;
  else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
  else return `${(size / 1048576).toFixed(2)} MB`;
};
