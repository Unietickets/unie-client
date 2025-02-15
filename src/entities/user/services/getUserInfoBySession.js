import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getUserByEmail } from "./getUserByEmail";

export const getUserInfoBySession = async () => {
  const session = await getServerSession(authOptions);
  const { user } = session;

  return await getUserByEmail({ email: user.email });;
}
