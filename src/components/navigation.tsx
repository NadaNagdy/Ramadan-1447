"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CrescentMoon } from './islamic-decorations';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/daily-duas', label: 'أدعية الأيام' },
    { path: '/categories', label: 'أدعية بالنية' },
    { path: '/share', label: 'شارك دعاءك' },
    { path: '/about', label: 'عن الموقع' },
  ];

  const isActive = (path: string) => (path === '/' ? pathname === path : pathname.startsWith(path));

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <CrescentMoon className="w-8 h-8 text-gold" />
            <span className="font-amiri text-xl text-gold font-bold">أدعية رمضان</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className={cn(
                'font-cairo text-sm transition-colors',
                isActive(link.path) ? 'text-gold font-semibold' : 'text-cream/70 hover:text-gold'
              )}>
                {link.label}
              </Link>
            ))}
          </div>
          <button className="md:hidden text-cream p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-navy border-t border-gold/10 p-4 absolute top-full left-0 right-0">
          <div className="container mx-auto flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={() => setIsOpen(false)} 
                className={cn(
                  'block py-3 text-center rounded-md transition-colors',
                  isActive(link.path) ? 'text-navy bg-gold font-semibold' : 'text-cream hover:text-gold hover:bg-gold/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
