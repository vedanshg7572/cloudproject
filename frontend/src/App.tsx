import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import LoadingSpinner from './components/LoadingSpinner';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const AICopilot = lazy(() => import('./pages/AICopilot'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const CostExplorer = lazy(() => import('./pages/CostExplorer'));
const Resources = lazy(() => import('./pages/Resources'));
const Simulator = lazy(() => import('./pages/Simulator'));
const Settings = lazy(() => import('./pages/Settings'));
const About = lazy(() => import('./pages/About'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Suspense fallback={<LoadingSpinner />}><Dashboard /></Suspense>} />
          <Route path="copilot" element={<Suspense fallback={<LoadingSpinner />}><AICopilot /></Suspense>} />
          <Route path="recommendations" element={<Suspense fallback={<LoadingSpinner />}><Recommendations /></Suspense>} />
          <Route path="cost-explorer" element={<Suspense fallback={<LoadingSpinner />}><CostExplorer /></Suspense>} />
          <Route path="resources" element={<Suspense fallback={<LoadingSpinner />}><Resources /></Suspense>} />
          <Route path="simulator" element={<Suspense fallback={<LoadingSpinner />}><Simulator /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<LoadingSpinner />}><Settings /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<LoadingSpinner />}><About /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
