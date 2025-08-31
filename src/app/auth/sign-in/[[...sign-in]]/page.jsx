import React from 'react';

import { Auth } from '@/features/auth/ui/Auth/Auth';

// Отключаем статическую генерацию для этой страницы
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const SignIn = () => {
    return (
        <div>
            <Auth />
        </div>
    );
};

export default SignIn;
