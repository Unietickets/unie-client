'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/shared/ui';
import { ROUTES } from '@core/routes';

import authService from '../../services';

import * as S from './RegisterForm.styles';

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await authService.register({ email, password, name });

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
    <S.Form 
      onSubmit={handleSubmit} 
    >
      <S.Info>
        <S.Title>Register form</S.Title>
        <S.SubTitle>Fill out all the fields and join our community</S.SubTitle>
      </S.Info>
      
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      <S.Button
        variant='primary' 
        size='medium'
        isRounded
        type="submit" 
        fullWidth={false}
      >
        Register
      </S.Button>
      
      <span>
        Already have an account?&nbsp;
        <S.MyLink 
          href={ROUTES.signIn.href} 
          className="text-blue-500 hover:underline"
        >
          Sign in
        </S.MyLink>
      </span>
    </S.Form>
  );
}