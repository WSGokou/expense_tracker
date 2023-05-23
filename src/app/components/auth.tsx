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
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type='submit'>Login</button>
    </form>
  );
};

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>LogoutButton</button>;
};
