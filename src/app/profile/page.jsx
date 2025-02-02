import userService from "@entities/user/services";
// import { UserInfo } from "@entities/user";

export default async function Profile() {
  // const userEmail = localStorage.getItem('userEmail');

  // const userInfo = await userService.getUserByEmail({ email: userEmail });

  return (
    <div>
      profile
      {/* <UserInfo email={userInfo.email} name={userInfo.name}/> */}
    </div>
  );
}
