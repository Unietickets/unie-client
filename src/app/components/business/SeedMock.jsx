'use client'

import React from 'react';

const SeedMock = () => {
    return (
        <button onClick={() => fetch('http://localhost:3000/api/mock/seed', {method: 'POST'})}>SEED MOCK DATA</button>
    );
};

export default SeedMock;