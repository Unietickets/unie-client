'use client'

import styled from "styled-components"

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Select = styled.select`
  width: 100%;

  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.primary};
`;

