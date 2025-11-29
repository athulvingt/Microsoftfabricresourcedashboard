import { useState } from 'react';
import { mockWorkspaces } from '../utils/mockData';
import { CheckCircle, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function AnalysisPlanning() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(mockWorkspaces[1]);
  const planId = 'PLAN-2025-11-29-B4C7';
  const snapshotId = 'SNAP-2025-11-29-001';

  const keepWorkspaces = mockWorkspaces.filter(w => w.classification === 'Keep');
  const reviewWorkspaces = mockWorkspaces.filter(w => w.classification === 'Review');
  const decommissionWorkspaces = mockWorkspaces.filter(w => w.classification === 'Decommission');

  const getRecommendedActions = (workspace: typeof selectedWorkspace) => {
    switch (workspace.classification) {
      case 'Keep':
        return ['Continue monitoring', 'Maintain current configuration', 'Review quarterly'];
      case 'Review':
        return ['Assess usage patterns', 'Consider resource optimization', 'Schedule stakeholder review'];
      case 'Decommission':
        return ['Backup critical data', 'Notify stakeholders', 'Archive workspace', 'Remove resources'];
      default:
        return [];
    }
  };

  const getJustification = (workspace: typeof selectedWorkspace) => {
    const daysSinceActivity = Math.floor((new Date().getTime() - new Date(workspace.lastActivity).getTime()) / (1000 * 60 * 60 * 24));
    
    if (workspace.classification === 'Keep') {
      return `Active workspace with ${workspace.pipelines} pipelines and ${workspace.sparkJobs} Spark jobs running. Last activity ${daysSinceActivity} days ago. Critical to ongoing operations.`;
    } else if (workspace.classification === 'Review') {
      return `Irregular activity detected. Last activity ${daysSinceActivity} days ago. Resources underutilized. Stakeholder review recommended to assess business value.`;
    } else {
      return `No significant activity in ${daysSinceActivity} days. Trial period expired. Minimal resources suggest workspace no longer needed. Recommend decommission.`;
    }
  };

  const handleApprovePlan = () => {
    toast.success('Plan approved');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Analysis & Planning</h2>
          <p className="text-sm text-gray-500">
            AI-generated workspace classifications
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => toast.success('Export started')}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 inline mr-2" />
            Export
          </button>
          <button
            onClick={handleApprovePlan}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            <CheckCircle className="w-4 h-4 inline mr-2" />
            Approve Plan
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-6 text-xs text-gray-500">
        <div>
          <span className="text-gray-400">Plan ID:</span>{' '}
          <span className="font-mono">{planId}</span>
        </div>
        <div className="h-3 w-px bg-gray-200"></div>
        <div>
          <span className="text-gray-400">Snapshot:</span>{' '}
          <span className="font-mono">{snapshotId}</span>
        </div>
        <div className="h-3 w-px bg-gray-200"></div>
        <div>
          <span className="text-gray-400">Generated:</span>{' '}
          {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Workspace List */}
        <div className="col-span-4">
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="border-b px-4 py-3">
              <h3 className="text-sm text-gray-900">Workspaces ({mockWorkspaces.length})</h3>
            </div>

            <div className="divide-y max-h-[calc(100vh-280px)] overflow-y-auto">
              {/* Keep */}
              {keepWorkspaces.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Keep ({keepWorkspaces.length})</div>
                  </div>
                  {keepWorkspaces.map((workspace) => (
                    <button
                      key={workspace.id}
                      onClick={() => setSelectedWorkspace(workspace)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedWorkspace.id === workspace.id ? 'bg-gray-100' : ''
                      }`}
                    >
                      <div className="text-sm text-gray-900 mb-0.5">{workspace.name}</div>
                      <div className="text-xs text-gray-500">{workspace.type}</div>
                    </button>
                  ))}
                </>
              )}

              {/* Review */}
              {reviewWorkspaces.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Review ({reviewWorkspaces.length})</div>
                  </div>
                  {reviewWorkspaces.map((workspace) => (
                    <button
                      key={workspace.id}
                      onClick={() => setSelectedWorkspace(workspace)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedWorkspace.id === workspace.id ? 'bg-gray-100' : ''
                      }`}
                    >
                      <div className="text-sm text-gray-900 mb-0.5">{workspace.name}</div>
                      <div className="text-xs text-gray-500">{workspace.type}</div>
                    </button>
                  ))}
                </>
              )}

              {/* Decommission */}
              {decommissionWorkspaces.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Decommission ({decommissionWorkspaces.length})</div>
                  </div>
                  {decommissionWorkspaces.map((workspace) => (
                    <button
                      key={workspace.id}
                      onClick={() => setSelectedWorkspace(workspace)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedWorkspace.id === workspace.id ? 'bg-gray-100' : ''
                      }`}
                    >
                      <div className="text-sm text-gray-900 mb-0.5">{workspace.name}</div>
                      <div className="text-xs text-gray-500">{workspace.type}</div>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="col-span-8">
          <div className="bg-white border rounded-lg p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{selectedWorkspace.name}</h3>
                <p className="text-xs text-gray-400 font-mono">{selectedWorkspace.id}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded ${
                selectedWorkspace.classification === 'Keep' ? 'bg-green-50 text-green-700' :
                selectedWorkspace.classification === 'Review' ? 'bg-yellow-50 text-yellow-700' :
                'bg-red-50 text-red-700'
              }`}>
                {selectedWorkspace.classification}
              </span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 pb-6 border-b">
              <div>
                <div className="text-xs text-gray-500 mb-1">Type</div>
                <div className="text-sm text-gray-900">{selectedWorkspace.type}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Last Activity</div>
                <div className="text-sm text-gray-900">
                  {new Date(selectedWorkspace.lastActivity).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Monthly Cost</div>
                <div className="text-sm text-gray-900">${selectedWorkspace.monthlyCost}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Status</div>
                <div className="text-sm text-gray-900">{selectedWorkspace.status}</div>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm text-gray-900 mb-3">Resources</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="px-3 py-2 bg-gray-50 rounded">
                  <div className="text-xs text-gray-500">Lakehouses</div>
                  <div className="text-sm text-gray-900 mt-0.5">{selectedWorkspace.lakehouses}</div>
                </div>
                <div className="px-3 py-2 bg-gray-50 rounded">
                  <div className="text-xs text-gray-500">Pipelines</div>
                  <div className="text-sm text-gray-900 mt-0.5">{selectedWorkspace.pipelines}</div>
                </div>
                <div className="px-3 py-2 bg-gray-50 rounded">
                  <div className="text-xs text-gray-500">Spark Jobs</div>
                  <div className="text-sm text-gray-900 mt-0.5">{selectedWorkspace.sparkJobs}</div>
                </div>
              </div>
            </div>

            {/* Justification */}
            <div>
              <h4 className="text-sm text-gray-900 mb-2">Classification Rationale</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {getJustification(selectedWorkspace)}
              </p>
            </div>

            {/* Recommended Actions */}
            <div>
              <h4 className="text-sm text-gray-900 mb-3">Recommended Actions</h4>
              <div className="space-y-2">
                {getRecommendedActions(selectedWorkspace).map((action, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-gray-400">{index + 1}.</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
