'use client'

import { mediaQueries } from '@/shared/config';

import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 343px;

  ${mediaQueries.gt.Tablet} {
    max-width: 573px;
  }

  // TODO вернуть, когда будет десктоп
  /* ${mediaQueries.gt.Desktop} {
    max-width: 1440px;
  } */
`;
