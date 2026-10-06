import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
}) => {
  const maxW = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
  }[size];

  return (
    <div className={`mx-auto w-full px-5 sm:px-8 md:px-10 lg:px-12 ${maxW} ${className}`}>
      {children}
    </div>
  );
};
