import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">
          © 2024 Student Information Portal
        </p>
        <small className="text-muted">
          React + TypeScript + Bootstrap
        </small>
      </div>
    </footer>
  );
};

export default Footer;