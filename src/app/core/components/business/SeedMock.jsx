'use client'

import React from 'react';

export const SeedMock = () => {
    return (
        <button onClick={() => fetch('http://localhost:3000/api/mock/seed', {method: 'POST'})}>SEED MOCK DATA</button>
    );
};