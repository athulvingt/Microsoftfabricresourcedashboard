import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  CheckSquare, 
  History, 
  DollarSign, 
  Settings 
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/discovery', label: 'Discovery', icon: Search },
  { path: '/planning', label: 'Planning', icon: FileText },
  { path: '/execution', label: 'Execution', icon: CheckSquare },
  { path: '/audit', label: 'Audit Trail', icon: History },
  { path: '/cost', label: 'Cost', icon: DollarSign },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar() {
  return (
    <aside className="w-56 bg-white border-r flex flex-col">
      <div className="px-6 py-5 border-b">
        <h1 className="text-gray-900">Fabric Manager</h1>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="text-xs text-gray-400">
          v1.2.4
        </div>
      </div>
    </aside>
  );
}
