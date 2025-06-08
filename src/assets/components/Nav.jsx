import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="sidebar">
      <div className="nav-logo">
        <img src="/Images/Logo.svg" alt="Logo" />
        
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            <span className="icon">
              <img src="/Images/Ticket.svg" alt="Nav-Event" />
              Events
              </span> 
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
