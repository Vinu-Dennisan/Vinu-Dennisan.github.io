import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Students from './Students';
import About from './About';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;

