import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { 
  User, 
  FileText, 
  Code, 
  Briefcase, 
  Palette, 
  Plus,
  Settings,
  Home
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  setActiveSection,
  isOpen,
  onClose
}) => {
  const { portfolios, createPortfolio } = usePortfolio();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'about', label: 'About', icon: FileText },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'theme', label: 'Theme', icon: Palette },
  ];

  const handleCreatePortfolio = async () => {
    const name = prompt('Enter portfolio name:');
    if (name) {
      try {
        const id = await createPortfolio(name);
        navigate(`/admin/portfolio/${id}`);
        onClose();
      } catch (error) {
        console.error('Error creating portfolio:', error);
      }
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-auto`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Portfolio CMS
          </h2>
        </div>

        <nav className="p-4 space-y-2">
          {/* Portfolio Management */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Portfolios
            </h3>
            
            <button
              onClick={handleCreatePortfolio}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
            >
              <Plus size={16} />
              <span>Create New</span>
            </button>

            <div className="mt-2 space-y-1">
              {portfolios.map((portfolio) => (
                <button
                  key={portfolio.id}
                  onClick={() => {
                    navigate(`/admin/portfolio/${portfolio.id}`);
                    onClose();
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <Home size={16} />
                  <span className="truncate">{portfolio.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Editor Sections */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Editor
            </h3>
            
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;