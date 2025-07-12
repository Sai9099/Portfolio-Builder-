import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { usePortfolio } from '../contexts/PortfolioContext';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink,
  Download,
  Sun,
  Moon,
  Star,
  Calendar,
  Building
} from 'lucide-react';

const PortfolioView: React.FC = () => {
  const { id } = useParams();
  const { getPortfolio } = usePortfolio();
  const [portfolio, setPortfolio] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (id) {
      const foundPortfolio = getPortfolio(id);
      if (foundPortfolio) {
        setPortfolio(foundPortfolio);
        setDarkMode(foundPortfolio.data.theme.darkMode);
        
        // Apply theme to document
        if (foundPortfolio.data.theme.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  }, [id, getPortfolio]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!portfolio) {
    return <Navigate to="/" replace />;
  }

  const { data } = portfolio;
  const { personal, about, skills, projects, social, theme } = data;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 py-8"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="text-center mb-16">
          <div 
            className="relative p-12 rounded-3xl text-white mb-8 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10">
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-xl object-cover"
              />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{personal.name}</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-6">{personal.title}</p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">{personal.bio}</p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                {personal.email && (
                  <div className="flex items-center space-x-2">
                    <Mail size={18} />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone size={18} />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin size={18} />
                    <span>{personal.location}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 mt-6">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
                  >
                    <Github size={20} />
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {social.twitter && (
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
                  >
                    <Twitter size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">About Me</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {about.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Education */}
              {about.education.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" style={{ color: theme.primaryColor }} />
                    Education
                  </h3>
                  <div className="space-y-4">
                    {about.education.map((edu, index) => (
                      <div key={index} className="border-l-4 pl-4" style={{ borderColor: theme.primaryColor }}>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{edu.year}</p>
                        {edu.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {about.experience.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2" style={{ color: theme.secondaryColor }} />
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {about.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 pl-4" style={{ borderColor: theme.secondaryColor }}>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{exp.period}</p>
                        {exp.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        {skills.length > 0 && (
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{category}</h3>
                  <div className="space-y-4">
                    {categorySkills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${skill.level}%`,
                              backgroundColor: theme.primaryColor
                            }}
                          ></div>
                        </div>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={12}
                              className={`${
                                star <= Math.ceil(skill.level / 20)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {project.featured && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-sm font-medium flex items-center">
                      <Star size={14} className="mr-1 fill-current" />
                      Featured Project
                    </div>
                  )}
                  
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(typeof project.technologies === 'string' 
                        ? project.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
                        : project.technologies || []
                      ).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: `${theme.primaryColor}20`,
                            color: theme.primaryColor
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex space-x-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 px-3 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                        >
                          <Github size={14} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact Section */}
        <motion.section variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Get In Touch</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <Mail size={18} />
                <span>Send Email</span>
              </a>
              
              {personal.phone && (
                <a
                  href={`tel:${personal.phone}`}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: theme.secondaryColor }}
                >
                  <Phone size={18} />
                  <span>Call Me</span>
                </a>
              )}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PortfolioView;