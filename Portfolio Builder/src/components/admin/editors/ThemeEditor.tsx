import React from 'react';
import { useForm } from 'react-hook-form';
import { usePortfolio, Portfolio } from '../../../contexts/PortfolioContext';
import { Palette, Monitor, Sun, Moon, Layout } from 'lucide-react';
import toast from 'react-hot-toast';

interface ThemeEditorProps {
  portfolio: Portfolio;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ portfolio }) => {
  const { updatePortfolio } = usePortfolio();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: portfolio.data.theme
  });

  const watchedTheme = watch();

  const onSubmit = async (data: any) => {
    try {
      await updatePortfolio(portfolio.id, { theme: data });
      toast.success('Theme updated successfully!');
    } catch (error) {
      toast.error('Failed to update theme');
    }
  };

  const colorPresets = [
    { name: 'Blue Ocean', primary: '#3B82F6', secondary: '#8B5CF6' },
    { name: 'Emerald Forest', primary: '#10B981', secondary: '#059669' },
    { name: 'Sunset Orange', primary: '#F59E0B', secondary: '#EF4444' },
    { name: 'Purple Galaxy', primary: '#8B5CF6', secondary: '#EC4899' },
    { name: 'Teal Wave', primary: '#14B8A6', secondary: '#06B6D4' },
    { name: 'Rose Gold', primary: '#F43F5E', secondary: '#EC4899' },
  ];

  const layouts = [
    { id: 'modern', name: 'Modern', description: 'Clean, card-based design with gradients' },
    { id: 'classic', name: 'Classic', description: 'Traditional layout with elegant typography' },
    { id: 'minimal', name: 'Minimal', description: 'Simple, content-focused design' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-pink-100 dark:bg-pink-900 p-2 rounded-lg">
          <Palette className="w-5 h-5 text-pink-600 dark:text-pink-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Theme Customization</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Color Scheme */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Color Scheme</h3>
          
          {/* Color Presets */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick Presets
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    // Update form values
                    const form = document.querySelector('form') as HTMLFormElement;
                    const primaryInput = form.querySelector('[name="primaryColor"]') as HTMLInputElement;
                    const secondaryInput = form.querySelector('[name="secondaryColor"]') as HTMLInputElement;
                    if (primaryInput) primaryInput.value = preset.primary;
                    if (secondaryInput) secondaryInput.value = preset.secondary;
                  }}
                  className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="flex space-x-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.primary }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.secondary }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  {...register('primaryColor')}
                  type="color"
                  className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                />
                <input
                  {...register('primaryColor')}
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  {...register('secondaryColor')}
                  type="color"
                  className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                />
                <input
                  {...register('secondaryColor')}
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="#8B5CF6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dark Mode */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Display Mode</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                {...register('darkMode')}
                type="checkbox"
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <div className="flex items-center space-x-2">
                {watchedTheme.darkMode ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {watchedTheme.darkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Layout Style */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Layout Style</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {layouts.map((layout) => (
              <label
                key={layout.id}
                className={`cursor-pointer border-2 rounded-lg p-4 transition-all duration-200 ${
                  watchedTheme.layout === layout.id
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <input
                  {...register('layout')}
                  type="radio"
                  value={layout.id}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3 mb-2">
                  <Layout className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {layout.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {layout.description}
                </p>
              </label>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <div className="space-y-4">
              {/* Header Preview */}
              <div
                className="p-4 rounded-lg text-white"
                style={{
                  background: `linear-gradient(135deg, ${watchedTheme.primaryColor || '#3B82F6'} 0%, ${watchedTheme.secondaryColor || '#8B5CF6'} 100%)`
                }}
              >
                <h4 className="font-bold text-lg">Your Name</h4>
                <p className="opacity-90">Professional Title</p>
              </div>

              {/* Content Preview */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">About Section</h5>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Skills</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">React</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{ 
                          width: '90%',
                          backgroundColor: watchedTheme.primaryColor || '#3B82F6'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button Preview */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: watchedTheme.primaryColor || '#3B82F6' }}
                >
                  Primary Button
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: watchedTheme.secondaryColor || '#8B5CF6' }}
                >
                  Secondary Button
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
        >
          Save Theme Settings
        </button>
      </form>
    </div>
  );
};

export default ThemeEditor;