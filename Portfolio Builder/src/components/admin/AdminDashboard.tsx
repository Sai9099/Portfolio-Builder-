import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import PersonalInfoEditor from './editors/PersonalInfoEditor';
import AboutEditor from './editors/AboutEditor';
import SkillsEditor from './editors/SkillsEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import ThemeEditor from './editors/ThemeEditor';
import PortfolioPreview from './PortfolioPreview';
import { Menu, X, Eye, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPortfolio, portfolios, setCurrentPortfolio } = usePortfolio();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    if (id) {
      const foundPortfolio = getPortfolio(id);
      if (foundPortfolio) {
        setPortfolio(foundPortfolio);
        setCurrentPortfolio(foundPortfolio);
      } else {
        navigate('/admin');
      }
    } else if (portfolios.length > 0) {
      // If no ID specified, use the first portfolio
      const firstPortfolio = portfolios[0];
      setPortfolio(firstPortfolio);
      setCurrentPortfolio(firstPortfolio);
      navigate(`/admin/portfolio/${firstPortfolio.id}`, { replace: true });
    } else {
      // No portfolios exist, redirect to main page to create one
      navigate('/');
    }
  }, [id, portfolios, getPortfolio, setCurrentPortfolio, navigate]);

  const handleSave = () => {
    toast.success('Portfolio saved successfully!');
  };

  const handleBackToList = () => {
    navigate('/');
  };

  const renderEditor = () => {
    if (!portfolio) return null;

    switch (activeSection) {
      case 'personal':
        return <PersonalInfoEditor portfolio={portfolio} />;
      case 'about':
        return <AboutEditor portfolio={portfolio} />;
      case 'skills':
        return <SkillsEditor portfolio={portfolio} />;
      case 'projects':
        return <ProjectsEditor portfolio={portfolio} />;
      case 'theme':
        return <ThemeEditor portfolio={portfolio} />;
      default:
        return <PersonalInfoEditor portfolio={portfolio} />;
    }
  };

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (previewMode) {
    return <PortfolioPreview portfolio={portfolio} onClose={() => setPreviewMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <button
              onClick={handleBackToList}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Portfolios</span>
            </button>
            
            <div className="border-l border-gray-300 dark:border-gray-600 pl-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Editing: {portfolio.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {portfolio.data.personal.name || 'Add your personal information'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreviewMode(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Eye size={16} />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Save size={16} />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Message for New Portfolios */}
            {!portfolio.data.personal.name && activeSection === 'personal' && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Welcome! Let's build your portfolio 🚀
                </h2>
                <p className="text-blue-700 dark:text-blue-300">
                  Start by adding your personal information below. You can always preview your changes and customize the theme later.
                </p>
              </div>
            )}
            
            {renderEditor()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;