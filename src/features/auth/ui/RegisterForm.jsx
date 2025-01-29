'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { register } from '../services';
import { ROUTES } from '@core/routes';

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await register({ email, password, name });

      const signInResponse = await signIn('credentials', {
        email,
        password,
        redirect: false, 
      });

      if (signInResponse?.error) {
        console.error('Ошибка входа:', signInResponse.error);
        alert('Ошибка входа:', signInResponse.error);
      } else {
          router.push('/');
      }
    } catch (e) {
      console.error(data || 'Register failed');
      alert(data || 'Register failed');
    }
    
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Register</h2>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
      />
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
      />
      
      <button 
        type="submit" 
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Register
      </button>
      
      <span className="block text-center mt-4 text-gray-500">
        Already have an account?&nbsp;
        <Link 
          href={ROUTES.signIn.href} 
          className="text-blue-500 hover:underline"
        >
          Sign in
        </Link>
      </span>
    </form>
  );
}