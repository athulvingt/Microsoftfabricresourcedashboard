import { useState } from 'react';
import { Bell, User } from 'lucide-react';

export default function Header() {
  const [mode] = useState<'Rule-based' | 'Agentic'>('Agentic');
  const [sessionId] = useState('SESSION-2025-11-29-A7B3C');

  return (
    <header className="bg-white border-b px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Mode</span>
            <span className="text-sm px-2.5 py-1 bg-gray-100 text-gray-700 rounded">
              {mode}
            </span>
          </div>
          <div className="h-4 w-px bg-gray-200"></div>
          <div className="text-xs text-gray-400 font-mono">
            {sessionId}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>Operational</span>
          </div>

          <button className="p-2 rounded hover:bg-gray-50 relative transition-colors">
            <Bell className="w-4 h-4 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 rounded hover:bg-gray-50 transition-colors">
            <User className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
