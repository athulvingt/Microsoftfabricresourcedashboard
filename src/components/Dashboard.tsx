import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { mockWorkspaces, activityFeed } from '../utils/mockData';

export default function Dashboard() {
  const totalWorkspaces = mockWorkspaces.length;
  const reviewCandidates = mockWorkspaces.filter(w => w.classification === 'Review' || w.classification === 'Decommission').length;
  const pendingApprovals = 3;
  const activeWorkspaces = mockWorkspaces.filter(w => w.status === 'Active').length;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const stats = [
    { label: 'Total Workspaces', value: totalWorkspaces, change: '+2', trend: 'up' },
    { label: 'Active', value: activeWorkspaces, change: '0', trend: 'neutral' },
    { label: 'Review Needed', value: reviewCandidates, change: '-1', trend: 'down' },
    { label: 'Pending Approvals', value: pendingApprovals, change: '+1', trend: 'up' },
  ];

  const quickLinks = [
    { label: 'Start Discovery', to: '/discovery', description: 'Scan for workspaces' },
    { label: 'View Plans', to: '/planning', description: 'Review classifications' },
    { label: 'Pending Actions', to: '/execution', description: `${pendingApprovals} awaiting approval` },
    { label: 'Cost Analysis', to: '/cost', description: 'View optimization' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-1">Overview</h2>
        <p className="text-sm text-gray-500">
          Microsoft Fabric resource management dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border rounded-lg p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</span>
              {stat.trend === 'up' && <TrendingUp className="w-3 h-3 text-gray-400" />}
              {stat.trend === 'down' && <TrendingDown className="w-3 h-3 text-gray-400" />}
              {stat.trend === 'neutral' && <Minus className="w-3 h-3 text-gray-400" />}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-gray-900">{stat.value}</span>
              <span className={`text-xs ${
                stat.trend === 'up' ? 'text-gray-500' : 
                stat.trend === 'down' ? 'text-gray-500' : 
                'text-gray-400'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between p-4 bg-white border rounded-lg hover:border-gray-900 transition-colors group"
              >
                <div>
                  <div className="text-sm text-gray-900 mb-0.5">{link.label}</div>
                  <div className="text-xs text-gray-500">{link.description}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h3 className="text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white border rounded-lg divide-y">
            {activityFeed.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-gray-600 flex-1">{activity.message}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
