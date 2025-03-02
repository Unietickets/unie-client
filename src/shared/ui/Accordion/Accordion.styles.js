'use client'

import styled from "styled-components";

export const Wrapper = styled.div`
  background:
    radial-gradient(73.26% 73.26% at -3.05% 107.59%, rgba(220, 194, 54, 0.2) 0%, rgba(50, 50, 50, 0.2) 100%),
    radial-gradient(68.02% 68.02% at 100% 104.46%, rgba(105, 245, 196, 0) 0%, rgba(50, 50, 50, 0.2) 100%),
    linear-gradient(0deg, rgba(52, 52, 52, 0.9), rgba(52, 52, 52, 0.9));

  border-radius: 15px;
  padding: 12px 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-top: 12px;
`;
