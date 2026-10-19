
import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>React Project Demo</h1>
      <nav className={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;
