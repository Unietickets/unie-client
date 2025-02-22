import { userService, UserInfo } from "@/entities/user";
import { LogoutButton } from "@features/auth";

import * as S from './styles';
import { redirect } from "next/navigation";
import { ROUTES } from "@/core/routes";

export default async function Profile() {
  const user = await userService.getUserInfoBySession();

  if (user === null) {
    redirect(ROUTES.signIn.href)
  }

  return (
    <S.Wrapper>
      <h1 className="text-2xl font-bold">Profile</h1>
      <UserInfo user={user} />
      <LogoutButton />
    </S.Wrapper>
  );
}
