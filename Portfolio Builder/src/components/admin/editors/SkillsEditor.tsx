import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { usePortfolio, Portfolio } from '../../../contexts/PortfolioContext';
import { Code, Plus, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface SkillsEditorProps {
  portfolio: Portfolio;
}

const SkillsEditor: React.FC<SkillsEditorProps> = ({ portfolio }) => {
  const { updatePortfolio } = usePortfolio();
  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: { skills: portfolio.data.skills }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills'
  });

  const watchedSkills = watch('skills');

  const onSubmit = async (data: any) => {
    try {
      await updatePortfolio(portfolio.id, { skills: data.skills });
      toast.success('Skills updated successfully!');
    } catch (error) {
      toast.error('Failed to update skills');
    }
  };

  const skillCategories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Other'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
          <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills Management</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            Add and manage your technical skills with proficiency levels
          </p>
          <button
            type="button"
            onClick={() => append({ name: '', level: 50, category: 'Frontend' })}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>Add Skill</span>
          </button>
        </div>

        <div className="grid gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Skill #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Skill Name
                  </label>
                  <input
                    {...register(`skills.${index}.name`, { required: 'Skill name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="JavaScript"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    {...register(`skills.${index}.category`, { required: 'Category is required' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {skillCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Proficiency Level: {watchedSkills?.[index]?.level || 50}%
                  </label>
                  <input
                    {...register(`skills.${index}.level`, { 
                      required: 'Level is required',
                      min: 0,
                      max: 100
                    })}
                    type="range"
                    min="0"
                    max="100"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>

              {/* Visual Preview */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {watchedSkills?.[index]?.name || 'Skill Name'}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {watchedSkills?.[index]?.level || 50}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${watchedSkills?.[index]?.level || 50}%` }}
                  ></div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={`${
                          star <= Math.ceil((watchedSkills?.[index]?.level || 50) / 20)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {watchedSkills?.[index]?.category || 'Category'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {fields.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">No skills added yet</p>
            <button
              type="button"
              onClick={() => append({ name: '', level: 50, category: 'Frontend' })}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 mx-auto"
            >
              <Plus size={16} />
              <span>Add Your First Skill</span>
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
        >
          Save Skills
        </button>
      </form>
    </div>
  );
};

export default SkillsEditor;