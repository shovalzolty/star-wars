import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavbarStyle.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Catalogue</Link></li>
        <li><Link to="/filter">Filter</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
