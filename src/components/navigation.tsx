"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CrescentMoon } from './islamic-decorations';
import { Menu, X, BookOpen, Calendar, Heart, Users, FolderHeart, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/daily-duas', label: 'أدعية الأيام', icon: Calendar },
    { path: '/categories', label: 'أدعية بالنية', icon: BookOpen },
    { path: '/ai-dua', label: 'اصنع دعاءك', icon: Heart },
    { path: '/community-duas', label: 'دعاء المشاركين', icon: Users },
    { path: '/my-duas', label: 'أدعيتي', icon: FolderHeart },
    { path: '/about', label: 'عن الموقع', icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    if (['/laylat-al-qadr', '/prophets-duas', '/quranic-duas'].includes(path)) return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-md border-b border-gold/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <CrescentMoon className="w-10 h-10 text-gold glow-gold" />
            <span className="font-amiri text-2xl text-cream font-bold">أدعية رمضان</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} className={cn(
                'font-cairo text-base transition-colors flex items-center gap-2 py-2',
                isActive(link.path) 
                  ? 'text-gold font-semibold border-b-2 border-gold' 
                  : 'text-cream/70 hover:text-gold border-b-2 border-transparent'
              )}>
                 {link.icon && <link.icon className="w-4 h-4" />}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          <button className="md:hidden text-cream p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-navy border-t border-gold/10 p-4 absolute top-full left-0 right-0 animate-fade-in">
          <div className="container mx-auto flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={() => setIsOpen(false)} 
                className={cn(
                  'block py-3 text-center rounded-md transition-colors text-lg',
                  isActive(link.path) ? 'text-navy bg-gold font-semibold' : 'text-cream hover:text-gold hover:bg-gold/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
