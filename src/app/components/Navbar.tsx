'use client';

import Link from 'next/link';
import React from 'react';
import {LogoutButton} from './auth';
import {usePathname} from 'next/navigation';

const navLinks = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Dashboard',
    href: '/dashboard',
  },
  {
    text: 'Expenses',
    href: '/dashboard/view',
  },
  {
    text: 'Add Expense',
    href: '/dashboard/add',
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div>
      {navLinks.map((link) => {
        const isActive = pathname.endsWith(link.href);

        return (
          <Link
            className={isActive ? 'text-blue-500' : 'text-black'}
            key={link.text}
            href={link.href}
          >
            {link.text}
          </Link>
        );
      })}
      <LogoutButton />
    </div>
  );
};

export default Navbar;
