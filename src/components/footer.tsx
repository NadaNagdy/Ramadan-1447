import React from 'react';
import { CrescentMoon } from './islamic-decorations';

const Footer: React.FC = () => (
  <footer className="bg-navy border-t border-gold/20 py-12">
    <div className="container mx-auto px-4 text-center">
      <CrescentMoon className="w-12 h-12 text-gold mx-auto mb-4 animate-float [animation-duration:8s]" />
      <p className="font-amiri text-xl text-cream mb-2">هذا الموقع صدقة جارية</p>
      <p className="text-cream/40 text-sm mt-8 font-cairo">رمضان كريم 🌙</p>
    </div>
  </footer>
);

export default Footer;
