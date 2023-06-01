import ExpensesPage from './dashboard/[slug]/page';
import {getServerSession} from 'next-auth';
import {LoginForm} from './components/auth';
import {authOptions} from './api/auth/[...nextauth]/route';
import User from './components/User';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className='flex flex-col text-center'>
      <h1>Home</h1>
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
      <LoginForm />
    </div>
  );
}
