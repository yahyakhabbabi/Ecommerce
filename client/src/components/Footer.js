import React from 'react';
import "../styles/main.css"
const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="copyright">
      &copy; {currentYear} team yahya. All rights reserved.
    </div>
  );
};

export default Copyright;
