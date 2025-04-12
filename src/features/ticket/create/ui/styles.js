'use client'

import { Colors } from "@/shared/constants";
import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";
import styled from "styled-components"

const DoneLineColor = Colors.MaximumGreen;
const InProgressLineColor = Colors.FluorescentOrange;

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
`;

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-end;

  gap: 25px;
`;

export const FormTitle = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  white-space: nowrap;

  margin-left: 44px;

  ${getTypographyStyles(TYPOGRAPHY.h2)};
`;

export const FirstLine = styled.div`
  width: 15px;
  height: 75px;
  margin-top: 16px;
  margin-left: 23px;

  border-top: 1px solid ${Colors.Mako};
  border-left: 1px solid ${Colors.Mako};;
  border-radius: 15px 0 0 0;

  background-color: transparent;

  ${({ isDone }) => isDone && `border-color: ${DoneLineColor};`};

  ${({ isInProgress }) => isInProgress && `border-color: ${InProgressLineColor};`};
`;

export const SecondLine = styled.div`
  width: 0px;
  height: 37px;
  margin-left: 23px;

  border-left: 1px solid ${Colors.Mako};;

  background-color: transparent;

  ${({ isDone }) => isDone && `border-color: ${DoneLineColor};`};

  ${({ isInProgress }) => isInProgress && `border-color: ${InProgressLineColor};`};
`;

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
  border-radius: 50%;

  background-color: ${Colors.Mako};

  ${({ isDone }) => isDone && `background-color: ${DoneLineColor};`};

  ${({ isInProgress }) => isInProgress && `background-color: ${InProgressLineColor};`};
`;

export const FieldWithPositionedLabel = styled.div`
  position: relative;

  flex: 1 0 0;
`;

export const Label = styled.label`
  position: absolute;
  top: -26px;
  left: 0;
`;

export const Select = styled.select`
  width: 100%;

  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.primary};
`;

