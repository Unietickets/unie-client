export const toggleInputFieldType = (fieldId) => {
  const field = document.getElementById(fieldId);

  if (!field) {
    throw new Error(`Field ${fieldId} not found`);
  }

  field.type = field.type === 'password' ? 'text' : 'password';
}
