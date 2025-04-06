'use client'

import { useState } from "react";
import { z } from "zod";

export const useValidation = (schema) => {
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
        console.error("Ошибки валидации:", formattedErrors);
      }
      return false;
    }
  };

  return {
    errors,
    validate
  }
}