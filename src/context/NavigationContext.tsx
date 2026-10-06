import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RoutePath } from '../types';

interface NavigationContextType {
  currentPath: RoutePath;
  navigate: (path: RoutePath, hash?: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function normalizePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/$/, '') || '/';
  if (clean === '/features') return '/features';
  if (clean === '/pricing') return '/pricing';
  if (clean === '/about') return '/about';
  if (clean === '/contact') return '/contact';
  return '/';
}

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: RoutePath, hash?: string) => {
    if (typeof window !== 'undefined') {
      const targetUrl = hash ? `${path}#${hash}` : path;
      window.history.pushState({}, '', targetUrl);
      setCurrentPath(path);
      
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavLink: React.FC<{
  to: RoutePath;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}> = ({ to, children, className = '', activeClassName = '', onClick }) => {
  const { currentPath, navigate } = useNavigation();
  const isActive = currentPath === to;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
};
