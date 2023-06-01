'use client';
import {signIn, signOut} from 'next-auth/react';
import React, {FormEvent, useState} from 'react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    signIn('credentials', {email, password});
  };

  return (
    <form onSubmit={handleSignIn}>
      <p>Test User Login:</p>
      <p>Email = test@test.com</p>
      <p>Password = Password123</p>
      <input
        type='text'
        className='border w-20'
        value={email}
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type='password'
        className='border w-20'
        value={password}
        placeholder={'password'}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        className='border-2 border-black'
        type='submit'
      >
        Login
      </button>
    </form>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className='border-2 border-black'
      onClick={() => signOut()}
    >
      LogoutButton
    </button>
  );
};
