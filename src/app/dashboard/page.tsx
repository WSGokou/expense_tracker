import {getServerSession} from 'next-auth';
import React from 'react';
import {authOptions} from '../api/auth/[...nextauth]/route';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div>
      <h1>Welcome to your dashboard {user.name}</h1>
    </div>
  );
};

export default DashboardPage;
