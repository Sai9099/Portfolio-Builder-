import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { AuthProvider } from './contexts/AuthContext';
import PortfolioView from './components/PortfolioView';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import PortfolioList from './components/admin/PortfolioList';
import ProtectedRoute from './components/admin/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              {/* Public Portfolio Routes */}
              <Route path="/" element={<PortfolioList />} />
              <Route path="/portfolio/:id" element={<PortfolioView />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/portfolio/:id" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;