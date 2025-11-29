import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight,
  Search,
  Download
} from 'lucide-react';
import { mockWorkspaces, Workspace } from '../utils/mockData';
import { toast } from 'sonner@2.0.3';

export default function DiscoveryResults() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const filteredWorkspaces = mockWorkspaces.filter((workspace) => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || workspace.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Workspace['status']) => {
    switch (status) {
      case 'Active': return 'text-green-700';
      case 'Idle': return 'text-yellow-700';
      case 'Warning': return 'text-red-700';
    }
  };

  const handleExport = () => {
    toast.success('Export started');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Discovery Results</h2>
          <p className="text-sm text-gray-500">
            {filteredWorkspaces.length} workspaces found
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search workspaces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Idle">Idle</option>
          <option value="Warning">Warning</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Resources</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Last Activity</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredWorkspaces.map((workspace) => (
              <>
                <tr
                  key={workspace.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => toggleRow(workspace.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {expandedRows.has(workspace.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-900">{workspace.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{workspace.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>{workspace.lakehouses} LH</span>
                      <span>{workspace.pipelines} PL</span>
                      <span>{workspace.sparkJobs} SJ</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(workspace.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs ${getStatusColor(workspace.status)}`}>
                      {workspace.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs text-gray-400 font-mono">{workspace.id}</span>
                  </td>
                </tr>
                {expandedRows.has(workspace.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="ml-6 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Lakehouses:</span>{' '}
                          <span className="text-gray-900">{workspace.lakehouses}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Pipelines:</span>{' '}
                          <span className="text-gray-900">{workspace.pipelines}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Spark Jobs:</span>{' '}
                          <span className="text-gray-900">{workspace.sparkJobs}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Monthly Cost:</span>{' '}
                          <span className="text-gray-900">${workspace.monthlyCost}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Classification:</span>{' '}
                          <span className={`${
                            workspace.classification === 'Keep' ? 'text-green-700' :
                            workspace.classification === 'Review' ? 'text-yellow-700' :
                            'text-red-700'
                          }`}>
                            {workspace.classification}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
