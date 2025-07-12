import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Portfolio {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  data: PortfolioData;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    profileImage: string;
  };
  about: {
    description: string;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
      description: string;
    }>;
    experience: Array<{
      title: string;
      company: string;
      period: string;
      description: string;
    }>;
  };
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
  }>;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    darkMode: boolean;
    layout: 'modern' | 'classic' | 'minimal';
  };
}

interface PortfolioContextType {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  createPortfolio: (name: string) => Promise<string>;
  updatePortfolio: (id: string, data: Partial<PortfolioData>) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  getPortfolio: (id: string) => Portfolio | null;
  setCurrentPortfolio: (portfolio: Portfolio | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

const createEmptyPortfolioData = (): PortfolioData => ({
  personal: {
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  about: {
    description: '',
    education: [],
    experience: []
  },
  skills: [],
  projects: [],
  social: {
    github: '',
    linkedin: '',
    twitter: '',
    email: ''
  },
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    darkMode: false,
    layout: 'modern'
  }
});

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    // Load portfolios from localStorage
    const savedPortfolios = localStorage.getItem('portfolios');
    if (savedPortfolios) {
      try {
        const parsed = JSON.parse(savedPortfolios);
        setPortfolios(parsed);
      } catch (error) {
        console.error('Error loading portfolios:', error);
        setPortfolios([]);
      }
    }
  }, []);

  const createPortfolio = async (name: string): Promise<string> => {
    const id = Date.now().toString();
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const newPortfolio: Portfolio = {
      id,
      name,
      slug,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: createEmptyPortfolioData()
    };

    const updatedPortfolios = [...portfolios, newPortfolio];
    setPortfolios(updatedPortfolios);
    localStorage.setItem('portfolios', JSON.stringify(updatedPortfolios));
    
    return id;
  };

  const updatePortfolio = async (id: string, data: Partial<PortfolioData>): Promise<void> => {
    const updatedPortfolios = portfolios.map(portfolio => {
      if (portfolio.id === id) {
        return {
          ...portfolio,
          data: { ...portfolio.data, ...data },
          updatedAt: new Date().toISOString()
        };
      }
      return portfolio;
    });

    setPortfolios(updatedPortfolios);
    localStorage.setItem('portfolios', JSON.stringify(updatedPortfolios));
    
    // Update current portfolio if it's the one being updated
    if (currentPortfolio?.id === id) {
      const updatedCurrent = updatedPortfolios.find(p => p.id === id);
      if (updatedCurrent) {
        setCurrentPortfolio(updatedCurrent);
      }
    }
  };

  const deletePortfolio = async (id: string): Promise<void> => {
    const updatedPortfolios = portfolios.filter(portfolio => portfolio.id !== id);
    setPortfolios(updatedPortfolios);
    localStorage.setItem('portfolios', JSON.stringify(updatedPortfolios));
    
    if (currentPortfolio?.id === id) {
      setCurrentPortfolio(null);
    }
  };

  const getPortfolio = (id: string): Portfolio | null => {
    return portfolios.find(portfolio => portfolio.id === id) || null;
  };

  return (
    <PortfolioContext.Provider value={{
      portfolios,
      currentPortfolio,
      createPortfolio,
      updatePortfolio,
      deletePortfolio,
      getPortfolio,
      setCurrentPortfolio
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};