'use client'

import { useSession } from 'next-auth/react';
import React from 'react';

export const UserInfo = () => {
    const session = useSession();

    // console.log(session);

    // const userData = await fetchUserData();

    return (
        <div>
            
        </div>
    );
};