'use client';

import { LogoutButton } from "@features/auth";

import * as S from './styles';

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 items-start p-4">
      <h1 className="text-2xl font-bold">Профиль</h1>
      <S.Wrapper>
        <LogoutButton />
      </S.Wrapper>
    </div>
  );
}
