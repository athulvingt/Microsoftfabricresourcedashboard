import { useState } from 'react';
import { mockActions, Action } from '../utils/mockData';
import { 
  Check,
  X,
  Info,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import ConfirmationModal from './ConfirmationModal';

export default function ExecutionApproval() {
  const [actions, setActions] = useState(mockActions);
  const [modalAction, setModalAction] = useState<Action | null>(null);
  const [modalType, setModalType] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = (action: Action) => {
    setModalAction(action);
    setModalType('approve');
  };

  const handleReject = (action: Action) => {
    setModalAction(action);
    setModalType('reject');
  };

  const confirmApprove = () => {
    if (modalAction) {
      setActions(actions.map(a => 
        a.id === modalAction.id ? { ...a, status: 'Approved' } : a
      ));
      toast.success('Action approved');
    }
    setModalAction(null);
    setModalType(null);
  };

  const confirmReject = () => {
    if (modalAction) {
      setActions(actions.map(a => 
        a.id === modalAction.id ? { ...a, status: 'Rejected' } : a
      ));
      toast.error('Action rejected');
    }
    setModalAction(null);
    setModalType(null);
  };

  const pendingActions = actions.filter(a => a.status === 'Pending');
  const processedActions = actions.filter(a => a.status !== 'Pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-1">Execution & Approval</h2>
        <p className="text-sm text-gray-500">
          {pendingActions.length} pending actions requiring review
        </p>
      </div>

      {/* Pending Actions */}
      <div className="space-y-3">
        {pendingActions.map((action) => (
          <div
            key={action.id}
            className="bg-white border rounded-lg p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm text-gray-900">{action.workspaceName}</h3>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                    {action.actionType}
                  </span>
                  {action.category >= 3 && (
                    <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-700 rounded">
                      Category {action.category}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 font-mono">{action.workspaceId}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Reason</div>
                <p className="text-sm text-gray-700">{action.reason}</p>
              </div>

              {action.category >= 3 && (
                <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-100 rounded text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-orange-900 mb-1">Impact Assessment</div>
                    <div className="text-orange-800">{action.impact}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-3 border-t">
              <button
                onClick={() => handleApprove(action)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
              >
                <Check className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => handleReject(action)}
                className="flex items-center gap-2 px-4 py-2 text-sm border rounded hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm border rounded hover:bg-gray-50 transition-colors">
                <Info className="w-4 h-4" />
                More Info
              </button>
            </div>
          </div>
        ))}

        {pendingActions.length === 0 && (
          <div className="bg-white border rounded-lg p-12 text-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-sm text-gray-900 mb-1">All Clear</h3>
            <p className="text-sm text-gray-500">No pending actions requiring approval</p>
          </div>
        )}
      </div>

      {/* Recently Processed */}
      {processedActions.length > 0 && (
        <div>
          <h3 className="text-sm text-gray-900 mb-3">Recently Processed</h3>
          <div className="space-y-2">
            {processedActions.map((action) => (
              <div
                key={action.id}
                className="flex items-center justify-between p-4 bg-white border rounded-lg"
              >
                <div className="flex-1">
                  <div className="text-sm text-gray-900 mb-0.5">{action.workspaceName}</div>
                  <div className="text-xs text-gray-500">{action.actionType}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-48 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-gray-900 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded ${
                    action.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {action.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {modalAction && (
        <ConfirmationModal
          isOpen={true}
          onClose={() => {
            setModalAction(null);
            setModalType(null);
          }}
          onConfirm={modalType === 'approve' ? confirmApprove : confirmReject}
          title={modalType === 'approve' ? 'Approve Action' : 'Reject Action'}
          message={
            modalType === 'approve'
              ? `Approve ${modalAction.actionType} action for ${modalAction.workspaceName}?`
              : `Reject ${modalAction.actionType} action for ${modalAction.workspaceName}?`
          }
          confirmText={modalType === 'approve' ? 'Approve' : 'Reject'}
          confirmVariant={modalType === 'approve' ? 'success' : 'danger'}
        />
      )}
    </div>
  );
}
