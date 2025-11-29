import { useState } from 'react';
import { mockAuditEntries } from '../utils/mockData';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function AuditTrail() {
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());

  const toggleEntry = (id: string) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedEntries(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Audit Trail</h2>
          <p className="text-sm text-gray-500">
            Complete execution history with verification
          </p>
        </div>
        <button
          onClick={() => toast.success('Export started')}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
        >
          <Download className="w-4 h-4 inline mr-2" />
          Export
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {mockAuditEntries.map((entry, index) => (
          <div key={entry.id} className="bg-white border rounded-lg">
            <button
              onClick={() => toggleEntry(entry.id)}
              className="w-full text-left p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(entry.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm text-gray-900">{entry.workspaceName}</h3>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {entry.actionType}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      entry.status === 'Success' ? 'bg-green-50 text-green-700' :
                      entry.status === 'Failed' ? 'bg-red-50 text-red-700' :
                      'bg-yellow-50 text-yellow-700'
                    }`}>
                      {entry.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {expandedEntries.has(entry.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </button>

            {expandedEntries.has(entry.id) && (
              <div className="px-5 pb-5 pt-2 border-t bg-gray-50">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Before</div>
                    <div className="p-3 bg-white border rounded text-xs space-y-1">
                      {Object.entries(entry.beforeState).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500">{key}</span>
                          <span className="text-gray-900 font-mono">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-2">After</div>
                    <div className="p-3 bg-white border rounded text-xs space-y-1">
                      {Object.entries(entry.afterState).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500">{key}</span>
                          <span className="text-gray-900 font-mono">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-2">Verification</div>
                  <div className="space-y-1">
                    {entry.verificationResults.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
