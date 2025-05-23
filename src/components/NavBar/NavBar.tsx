import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Button  from '../Button/button';
import './NavBar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleNav = () => {
    navigate('/dashboard');
  };
  return (
    <nav className="navbar">
      <div className="navbar__logo"><img src='assets\logo.svg'/></div>

      <div className={`navbar__links ${isOpen ? 'open' : ''}`}>
        <Button variant='outline'>Sobre Nós</Button>
        <Button  variant='outline' onClick={handleNav}>Dashboard</Button>
        
      </div>

      <div className="navbar__toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
