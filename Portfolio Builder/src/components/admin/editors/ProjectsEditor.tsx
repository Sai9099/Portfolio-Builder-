import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { usePortfolio, Portfolio } from '../../../contexts/PortfolioContext';
import { Briefcase, Plus, Trash2, ExternalLink, Github, Star, Image } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProjectsEditorProps {
  portfolio: Portfolio;
}

const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ portfolio }) => {
  const { updatePortfolio } = usePortfolio();
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: { projects: portfolio.data.projects }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects'
  });

  const watchedProjects = watch('projects');

  const onSubmit = async (data: any) => {
    try {
      await updatePortfolio(portfolio.id, { projects: data.projects });
      toast.success('Projects updated successfully!');
    } catch (error) {
      toast.error('Failed to update projects');
    }
  };

  const addTechnology = (projectIndex: number, technology: string) => {
    if (!technology.trim()) return;
    
    const currentTech = watchedProjects?.[projectIndex]?.technologies || [];
    if (!currentTech.includes(technology)) {
      // This would need to be handled differently in a real implementation
      // For now, we'll just show the input field
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
          <Briefcase className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects Portfolio</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            Showcase your best work and projects
          </p>
          <button
            type="button"
            onClick={() => append({
              id: Date.now().toString(),
              title: '',
              description: '',
              image: '',
              technologies: [],
              liveUrl: '',
              githubUrl: '',
              featured: false
            })}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>Add Project</span>
          </button>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Project #{index + 1}</h4>
                  <label className="flex items-center space-x-2">
                    <input
                      {...register(`projects.${index}.featured`)}
                      type="checkbox"
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Star size={14} className="mr-1" />
                      Featured
                    </span>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Title
                    </label>
                    <input
                      {...register(`projects.${index}.title`, { required: 'Title is required' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="E-Commerce Platform"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      {...register(`projects.${index}.description`, { required: 'Description is required' })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="A full-stack e-commerce solution with modern features..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <Image size={16} className="inline mr-1" />
                      Project Image URL
                    </label>
                    <input
                      {...register(`projects.${index}.image`)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://images.pexels.com/..."
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <ExternalLink size={16} className="inline mr-1" />
                      Live Demo URL
                    </label>
                    <input
                      {...register(`projects.${index}.liveUrl`)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://myproject.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <Github size={16} className="inline mr-1" />
                      GitHub Repository
                    </label>
                    <input
                      {...register(`projects.${index}.githubUrl`)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Technologies (comma-separated)
                    </label>
                    <input
                      {...register(`projects.${index}.technologies`)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="React, Node.js, MongoDB"
                      onChange={(e) => {
                        const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(Boolean);
                        // Update the form value
                        e.target.value = technologies.join(', ');
                      }}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Separate technologies with commas
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Preview */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Preview</h5>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-start space-x-4">
                    {watchedProjects?.[index]?.image && (
                      <img
                        src={watchedProjects[index].image}
                        alt="Project preview"
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=300';
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h6 className="font-semibold text-gray-900 dark:text-white">
                          {watchedProjects?.[index]?.title || 'Project Title'}
                        </h6>
                        {watchedProjects?.[index]?.featured && (
                          <Star size={14} className="text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {watchedProjects?.[index]?.description || 'Project description...'}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(typeof watchedProjects?.[index]?.technologies === 'string' 
                          ? watchedProjects[index].technologies.split(',').map(tech => tech.trim()).filter(Boolean)
                          : watchedProjects?.[index]?.technologies || []
                        ).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        {watchedProjects?.[index]?.liveUrl && (
                          <span className="text-xs text-blue-600 dark:text-blue-400">Live Demo</span>
                        )}
                        {watchedProjects?.[index]?.githubUrl && (
                          <span className="text-xs text-gray-600 dark:text-gray-400">GitHub</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {fields.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">No projects added yet</p>
            <button
              type="button"
              onClick={() => append({
                id: Date.now().toString(),
                title: '',
                description: '',
                image: '',
                technologies: [],
                liveUrl: '',
                githubUrl: '',
                featured: false
              })}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 mx-auto"
            >
              <Plus size={16} />
              <span>Add Your First Project</span>
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200"
        >
          Save Projects
        </button>
      </form>
    </div>
  );
};

export default ProjectsEditor;