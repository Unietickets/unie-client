"use client";

import styled, { css } from "styled-components";
import { ClosedEyeIcon, OpenedEyeIcon } from "../Icons";

const iconMixin = css`
  position: absolute;

  top: 50%;
  right: 24px;

  transform: translateY(-50%);

  cursor: pointer;
`;

export const Wrapper = styled.div`
  position: relative;

  width: 100%;
`;

export const OpenedEye = styled(OpenedEyeIcon)`
  ${iconMixin};
`;

export const ClosedEye = styled(ClosedEyeIcon)`
  ${iconMixin};
`;
