import React from 'react';

function Card({ children, className = '', title }) {
  return (
    <div className={`bg-surface rounded-lg shadow overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-5 sm:px-6 border-b border-border-color">
          <h3 className="text-lg leading-6 font-medium text-text-main">{title}</h3>
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}

export default Card; 