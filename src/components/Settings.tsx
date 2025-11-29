import { useState } from 'react';
import { Save, Info } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Settings() {
  const [mode, setMode] = useState<'Rule-based' | 'Agentic'>('Agentic');
  const [testingMode, setTestingMode] = useState<'minutes' | 'days'>('days');
  const [workspacePattern, setWorkspacePattern] = useState('*');
  const [protectedPatterns, setProtectedPatterns] = useState('prod-*, production-*');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-1">Settings</h2>
        <p className="text-sm text-gray-500">
          System configuration and preferences
        </p>
      </div>

      {/* Mode Configuration */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm text-gray-900 mb-1">Operation Mode</h3>
            <p className="text-sm text-gray-500">Choose between rule-based or AI-powered mode</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-600">
            <Info className="w-3.5 h-3.5" />
            <span>Changes apply immediately</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMode('Rule-based')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              mode === 'Rule-based'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-sm text-gray-900 mb-1">Rule-based</div>
            <div className="text-xs text-gray-500">Predefined thresholds</div>
          </button>
          <button
            onClick={() => setMode('Agentic')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              mode === 'Agentic'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-sm text-gray-900 mb-1">Agentic (AI)</div>
            <div className="text-xs text-gray-500">AI-powered decisions</div>
          </button>
        </div>
      </div>

      {/* Testing Configuration */}
      <div className="bg-white border rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-sm text-gray-900 mb-1">Testing Mode</h3>
          <p className="text-sm text-gray-500">Use minutes for faster testing cycles</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTestingMode('days')}
            className={`px-4 py-3 rounded-lg border-2 transition-all text-sm ${
              testingMode === 'days'
                ? 'border-gray-900 bg-gray-50 text-gray-900'
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
            }`}
          >
            Days (Production)
          </button>
          <button
            onClick={() => setTestingMode('minutes')}
            className={`px-4 py-3 rounded-lg border-2 transition-all text-sm ${
              testingMode === 'minutes'
                ? 'border-gray-900 bg-gray-50 text-gray-900'
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
            }`}
          >
            Minutes (Testing)
          </button>
        </div>
      </div>

      {/* LLM Configuration */}
      <div className="bg-white border rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-sm text-gray-900 mb-1">LLM Configuration</h3>
          <p className="text-sm text-gray-500">Read-only deployment settings</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Provider</label>
            <input
              type="text"
              value="OpenAI"
              disabled
              className="w-full px-3 py-2 text-sm border rounded bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Model</label>
            <input
              type="text"
              value="gpt-4"
              disabled
              className="w-full px-3 py-2 text-sm border rounded bg-gray-50 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Endpoint</label>
            <input
              type="text"
              value="https://api.openai.com/v1"
              disabled
              className="w-full px-3 py-2 text-sm border rounded bg-gray-50 text-gray-600 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Workspace Filters */}
      <div className="bg-white border rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-sm text-gray-900 mb-1">Workspace Filters</h3>
          <p className="text-sm text-gray-500">Patterns for discovery and exclusion</p>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1.5">Discovery Pattern</label>
          <input
            type="text"
            value={workspacePattern}
            onChange={(e) => setWorkspacePattern(e.target.value)}
            placeholder="e.g., *, dev-*, test-*"
            className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono"
          />
          <p className="text-xs text-gray-500 mt-1.5">Use * for wildcard matching</p>
        </div>
      </div>

      {/* Guardrails */}
      <div className="bg-white border rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-sm text-gray-900 mb-1">Protection Rules</h3>
          <p className="text-sm text-gray-500">Patterns for protected workspaces</p>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-gray-500 mb-1.5">Protected Patterns</label>
          <textarea
            value={protectedPatterns}
            onChange={(e) => setProtectedPatterns(e.target.value)}
            placeholder="e.g., prod-*, production-*"
            rows={3}
            className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono"
          />
          <p className="text-xs text-gray-500 mt-1.5">Comma-separated patterns</p>
        </div>

        <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
          <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-yellow-900 mb-0.5">Production Safety</div>
            <div className="text-yellow-800 text-xs">
              Protected workspaces always require manual approval for destructive actions
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => toast.success('Settings saved')}
          className="flex items-center gap-2 px-6 py-2.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
