'use client'

import Link from "next/link";
import styled from "styled-components"

import { Colors } from "@/shared/constants";
import { getTypographyStyles, TYPOGRAPHY } from "@/shared/lib";
import { Button as BaseButton } from "@/shared/ui";

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
    ${getTypographyStyles(TYPOGRAPHY.caption)};
    font-size: 24px;
    color: ${Colors.Doctor};
`;

export const SubTitle = styled.span`
    ${getTypographyStyles(TYPOGRAPHY.caption)};
    color: ${Colors.Palladium};
`;

export const Button = styled(BaseButton)`
    margin-top: 48px;
`;

export const MyLink = styled(Link)`
    color: ${Colors.OffYellow};
`;