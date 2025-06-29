import React, { useState } from 'react';
import { Menu } from 'lucide-react';

const links = [
  { href: '#company', label: 'معلومات الشركة' },
  { href: '#services', label: 'الخدمات' },
  { href: '#projects', label: 'المشاريع' },
  { href: '#account', label: 'بيانات الدخول' },
];

const SideMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:w-48 mb-6 md:mb-0">
      <button
        className="md:hidden mb-4 flex items-center justify-center rounded border p-2"
        onClick={() => setOpen(!open)}
      >
        <Menu className="h-6 w-6" />
      </button>
      <nav
        className={`bg-white border rounded-lg shadow-md p-4 space-y-2 md:block ${
          open ? 'block' : 'hidden'
        }`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="block text-sm py-2 px-3 rounded hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;
