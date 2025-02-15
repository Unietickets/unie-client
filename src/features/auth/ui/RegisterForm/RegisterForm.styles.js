'use client'

import Link from "next/link";
import styled from "styled-components"

import { TYPOGRAPHY, getTypographyStyles } from "@shared/lib";
import { Button as BaseButton } from "@shared/ui";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: center;

    margin-bottom: 48px;
`;

export const Title = styled.span`
    ${getTypographyStyles(TYPOGRAPHY.h2)};
    font-size: 24px;
    color: ${({ theme }) => theme.text.primary};
`;

export const SubTitle = styled.span`
    ${getTypographyStyles(TYPOGRAPHY.body)};
    color: ${({ theme }) => theme.text.secondary};
`;

export const Button = styled(BaseButton)`
    margin-top: 48px;
`;

export const Caption = styled.span`
  ${getTypographyStyles(TYPOGRAPHY.body)};
  color: ${({ theme }) => theme.text.primary};
`;

export const MyLink = styled(Link)`
    color: ${({ theme }) => theme.primary};
`;
