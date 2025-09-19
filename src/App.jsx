import React from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/Sidebar';
import TabSystem from '@/components/TabSystem';
import './App.css';

function App() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <TabSystem />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
}

export default App;

