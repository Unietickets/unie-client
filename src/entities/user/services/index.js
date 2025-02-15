import { createUser } from './createUser';
import { getUserByEmail } from './getUserByEmail';
import { getUserById } from './getUserById';
import { getUserInfoBySession } from './getUserInfoBySession';

const userService = {
    createUser,
    getUserById,
    getUserByEmail,
    getUserInfoBySession
};

export default userService;
