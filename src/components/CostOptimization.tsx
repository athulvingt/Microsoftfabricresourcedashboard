import { mockWorkspaces } from '../utils/mockData';
import { TrendingDown, Download } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

export default function CostOptimization() {
  const totalCost = mockWorkspaces.reduce((sum, w) => sum + w.monthlyCost, 0);
  const idleWorkspaces = mockWorkspaces.filter(w => w.status === 'Idle');
  const potentialSavings = idleWorkspaces.reduce((sum, w) => sum + w.monthlyCost * 0.7, 0);

  // Cost by workspace
  const costByWorkspace = mockWorkspaces
    .sort((a, b) => b.monthlyCost - a.monthlyCost)
    .slice(0, 6)
    .map(w => ({
      name: w.name.length > 18 ? w.name.substring(0, 18) + '...' : w.name,
      cost: w.monthlyCost
    }));

  // Cost by type
  const costByType = [
    { name: 'Premium', value: mockWorkspaces.filter(w => w.type === 'Premium').reduce((sum, w) => sum + w.monthlyCost, 0) },
    { name: 'Standard', value: mockWorkspaces.filter(w => w.type === 'Standard').reduce((sum, w) => sum + w.monthlyCost, 0) },
    { name: 'Trial', value: mockWorkspaces.filter(w => w.type === 'Trial').reduce((sum, w) => sum + w.monthlyCost, 0) }
  ].filter(item => item.value > 0);

  const COLORS = ['#111827', '#4b5563', '#9ca3af'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Cost Optimization</h2>
          <p className="text-sm text-gray-500">
            Spending analysis and savings opportunities
          </p>
        </div>
        <button
          onClick={() => toast.success('Report exported')}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
        >
          <Download className="w-4 h-4 inline mr-2" />
          Export
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg p-5">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Monthly Spend</div>
          <div className="text-2xl text-gray-900">${totalCost.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Current period</div>
        </div>
        <div className="bg-white border rounded-lg p-5">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Potential Savings</div>
          <div className="text-2xl text-green-700">${potentialSavings.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">From {idleWorkspaces.length} idle workspaces</div>
        </div>
        <div className="bg-white border rounded-lg p-5">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Optimization Impact</div>
          <div className="text-2xl text-gray-900">{((potentialSavings / totalCost) * 100).toFixed(1)}%</div>
          <div className="text-xs text-gray-500 mt-1">Cost reduction</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Cost Distribution */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm text-gray-900 mb-6">Cost by Type</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={costByType}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {costByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Workspaces */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-sm text-gray-900 mb-6">Top Workspaces</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={costByWorkspace} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="cost" fill="#111827" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Optimization Opportunities */}
      <div>
        <h3 className="text-sm text-gray-900 mb-4">Optimization Opportunities</h3>
        <div className="space-y-3">
          {idleWorkspaces.map((workspace) => {
            const estimatedSavings = workspace.monthlyCost * 0.7;
            const daysSinceActivity = Math.floor((new Date().getTime() - new Date(workspace.lastActivity).getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div
                key={workspace.id}
                className="bg-white border rounded-lg p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-sm text-gray-900">{workspace.name}</h4>
                      <span className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded">
                        Idle {daysSinceActivity}d
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Workspace has been idle for {daysSinceActivity} days. Consider downsizing or archiving.
                    </p>
                    <div className="flex items-center gap-6 text-xs">
                      <div>
                        <span className="text-gray-500">Current: </span>
                        <span className="text-gray-900">${workspace.monthlyCost}/mo</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Savings: </span>
                        <span className="text-green-700">${estimatedSavings.toFixed(0)}/mo</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.success('Optimization queued')}
                    className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    Optimize
                  </button>
                </div>
              </div>
            );
          })}

          {idleWorkspaces.length === 0 && (
            <div className="bg-white border rounded-lg p-12 text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-sm text-gray-900 mb-1">Fully Optimized</h3>
              <p className="text-sm text-gray-500">No immediate optimization opportunities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
