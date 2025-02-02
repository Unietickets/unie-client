'use client'

import { useSession } from 'next-auth/react';
import React from 'react';

// import userService from '../services';

export const UserInfo = ({ email, name }) => {
    const { data } = useSession();

    // const userInfo = userService.getUserByEmail({ email: data?.user?.email });

    console.log(session);

    return (
        <div>
          email: {email}
          name: {name}
        </div>
    );
};
