import { createUser } from './createUser';
import { getUserByEmail } from './getUserByEmail';
import { getUserById } from './getUserById';

const userService = {
    createUser,
    getUserById,
    getUserByEmail
};

export default userService;
