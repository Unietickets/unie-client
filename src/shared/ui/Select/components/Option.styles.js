'use client'


import { Colors } from '@/shared/constants';
import styled from 'styled-components';

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const ImagePreview = styled.div`
  width: 32px;
  height: 22px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const OptionContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const OptionName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.White};
`;

export const OptionDate = styled.div`
  font-size: 12px;
  color: ${Colors.Palladium};
`;