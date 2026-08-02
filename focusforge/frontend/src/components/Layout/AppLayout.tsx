import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Sidebar />
      <Navbar />
      <main className="ml-64 flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
