export interface Workspace {
  id: string;
  name: string;
  type: 'Standard' | 'Premium' | 'Trial';
  lakehouses: number;
  pipelines: number;
  sparkJobs: number;
  lastActivity: string;
  status: 'Active' | 'Idle' | 'Warning';
  classification?: 'Keep' | 'Review' | 'Decommission';
  monthlyCost: number;
}

export interface Action {
  id: string;
  workspaceId: string;
  workspaceName: string;
  actionType: 'Delete' | 'Archive' | 'Optimize' | 'Monitor';
  category: 1 | 2 | 3 | 4;
  reason: string;
  impact: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Executing' | 'Completed';
  timestamp: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  workspaceName: string;
  actionType: string;
  status: 'Success' | 'Failed' | 'Pending';
  beforeState: any;
  afterState: any;
  verificationResults: string[];
}

export const mockWorkspaces: Workspace[] = [
  {
    id: 'ws-001',
    name: 'Production Analytics',
    type: 'Premium',
    lakehouses: 3,
    pipelines: 12,
    sparkJobs: 8,
    lastActivity: '2025-11-29T10:30:00Z',
    status: 'Active',
    classification: 'Keep',
    monthlyCost: 4500
  },
  {
    id: 'ws-002',
    name: 'Dev Testing Environment',
    type: 'Standard',
    lakehouses: 1,
    pipelines: 5,
    sparkJobs: 2,
    lastActivity: '2025-11-15T14:20:00Z',
    status: 'Idle',
    classification: 'Review',
    monthlyCost: 850
  },
  {
    id: 'ws-003',
    name: 'Marketing Insights',
    type: 'Standard',
    lakehouses: 2,
    pipelines: 8,
    sparkJobs: 5,
    lastActivity: '2025-11-28T16:45:00Z',
    status: 'Active',
    classification: 'Keep',
    monthlyCost: 2100
  },
  {
    id: 'ws-004',
    name: 'Temp Project Q3',
    type: 'Trial',
    lakehouses: 0,
    pipelines: 2,
    sparkJobs: 0,
    lastActivity: '2025-09-30T09:00:00Z',
    status: 'Idle',
    classification: 'Decommission',
    monthlyCost: 200
  },
  {
    id: 'ws-005',
    name: 'Finance Reporting',
    type: 'Premium',
    lakehouses: 4,
    pipelines: 15,
    sparkJobs: 10,
    lastActivity: '2025-11-29T08:15:00Z',
    status: 'Active',
    classification: 'Keep',
    monthlyCost: 5200
  },
  {
    id: 'ws-006',
    name: 'Legacy Sales Data',
    type: 'Standard',
    lakehouses: 1,
    pipelines: 3,
    sparkJobs: 1,
    lastActivity: '2025-10-20T11:30:00Z',
    status: 'Warning',
    classification: 'Review',
    monthlyCost: 650
  },
  {
    id: 'ws-007',
    name: 'POC Customer 360',
    type: 'Trial',
    lakehouses: 1,
    pipelines: 4,
    sparkJobs: 2,
    lastActivity: '2025-08-15T13:45:00Z',
    status: 'Idle',
    classification: 'Decommission',
    monthlyCost: 150
  },
  {
    id: 'ws-008',
    name: 'Operations Dashboard',
    type: 'Standard',
    lakehouses: 2,
    pipelines: 9,
    sparkJobs: 6,
    lastActivity: '2025-11-27T15:20:00Z',
    status: 'Active',
    classification: 'Keep',
    monthlyCost: 1800
  }
];

export const mockActions: Action[] = [
  {
    id: 'act-001',
    workspaceId: 'ws-004',
    workspaceName: 'Temp Project Q3',
    actionType: 'Delete',
    category: 4,
    reason: 'No activity for 60+ days, trial period expired',
    impact: 'Workspace and all resources will be permanently removed',
    status: 'Pending',
    timestamp: '2025-11-29T10:00:00Z'
  },
  {
    id: 'act-002',
    workspaceId: 'ws-007',
    workspaceName: 'POC Customer 360',
    actionType: 'Archive',
    category: 3,
    reason: 'Proof of concept completed, no recent usage',
    impact: 'Workspace will be archived, can be restored if needed',
    status: 'Pending',
    timestamp: '2025-11-29T10:05:00Z'
  },
  {
    id: 'act-003',
    workspaceId: 'ws-002',
    workspaceName: 'Dev Testing Environment',
    actionType: 'Optimize',
    category: 2,
    reason: 'Low utilization detected, resources can be downsized',
    impact: 'Reduce compute capacity by 40%, estimated savings $340/month',
    status: 'Pending',
    timestamp: '2025-11-29T10:10:00Z'
  },
  {
    id: 'act-004',
    workspaceId: 'ws-006',
    workspaceName: 'Legacy Sales Data',
    actionType: 'Monitor',
    category: 1,
    reason: 'Irregular usage pattern, monitoring for optimization opportunities',
    impact: 'Enhanced monitoring for 30 days',
    status: 'Approved',
    timestamp: '2025-11-29T09:30:00Z'
  }
];

export const mockAuditEntries: AuditEntry[] = [
  {
    id: 'audit-001',
    timestamp: '2025-11-28T14:30:00Z',
    workspaceName: 'Old Dev Workspace',
    actionType: 'Delete',
    status: 'Success',
    beforeState: { workspaces: 1, lakehouses: 1, pipelines: 3 },
    afterState: { workspaces: 0, lakehouses: 0, pipelines: 0 },
    verificationResults: [
      'Workspace successfully removed from catalog',
      'All associated resources cleaned up',
      'Audit log entry created'
    ]
  },
  {
    id: 'audit-002',
    timestamp: '2025-11-27T11:15:00Z',
    workspaceName: 'Testing Sandbox',
    actionType: 'Archive',
    status: 'Success',
    beforeState: { status: 'Active', storage: '250GB' },
    afterState: { status: 'Archived', storage: '250GB' },
    verificationResults: [
      'Workspace archived successfully',
      'Access permissions preserved',
      'Storage retained for recovery'
    ]
  },
  {
    id: 'audit-003',
    timestamp: '2025-11-26T16:45:00Z',
    workspaceName: 'Analytics Dev',
    actionType: 'Optimize',
    status: 'Success',
    beforeState: { computeUnits: 10, monthlyCost: 1200 },
    afterState: { computeUnits: 6, monthlyCost: 720 },
    verificationResults: [
      'Compute capacity reduced by 40%',
      'Performance monitoring active',
      'Cost savings: $480/month'
    ]
  }
];

export const activityFeed = [
  { id: '1', type: 'scan', message: 'Discovery scan completed - 8 workspaces found', timestamp: '2025-11-29T10:30:00Z' },
  { id: '2', type: 'plan', message: 'Analysis plan generated - 3 candidates for review', timestamp: '2025-11-29T10:15:00Z' },
  { id: '3', type: 'execution', message: 'Optimization applied to Dev Testing Environment', timestamp: '2025-11-29T09:45:00Z' },
  { id: '4', type: 'approval', message: 'Action approved: Monitor Legacy Sales Data', timestamp: '2025-11-29T09:30:00Z' },
  { id: '5', type: 'scan', message: 'Cost analysis updated', timestamp: '2025-11-29T09:00:00Z' }
];
