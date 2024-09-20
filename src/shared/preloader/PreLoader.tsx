import React from 'react';
import './PreLoader.css'; // Import the CSS for styling

const PreLoader = ({ text }: { text: string }) => {
  return (
    <div className="preloader">
      <div className="spinner"></div><span>{text}</span>
    </div>
  );
};

export default PreLoader;