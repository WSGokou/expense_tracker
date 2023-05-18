import Image from 'next/image';
import ExpensesPage from './expenses/page';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ExpensesPage />
    </div>
  );
}
