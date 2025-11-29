import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DiscoveryResults from './components/DiscoveryResults';
import AnalysisPlanning from './components/AnalysisPlanning';
import ExecutionApproval from './components/ExecutionApproval';
import AuditTrail from './components/AuditTrail';
import CostOptimization from './components/CostOptimization';
import Settings from './components/Settings';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/discovery" element={<DiscoveryResults />} />
          <Route path="/planning" element={<AnalysisPlanning />} />
          <Route path="/execution" element={<ExecutionApproval />} />
          <Route path="/audit" element={<AuditTrail />} />
          <Route path="/cost" element={<CostOptimization />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors />
    </Router>
  );
}
