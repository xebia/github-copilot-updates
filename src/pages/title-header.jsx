// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
  return (
    <div>
        <div className="titleHeader">

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/" className="back-button">Back to Home</Link>
          <img src="GitHubCopilot.svg" alt="GitHub Copilot Logo" style={{ width: '50px', height: 'auto' }} />
                <h2 id="title">{title}</h2>
            </div>
        </div>
    </div>
  );
};

export default Header;