import React, { useEffect, useRef, useState } from 'react';
import './About.css';

function About() {
  const [showDetails, setShowDetails] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const intervalRef = useRef(null);

  // useEffect as componentDidMount + cleanup
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current); // cleanup like componentWillUnmount
    };
  }, []);

  return (
    <div className="about-container">
      <h2>About This App</h2>
      <p>This React app demonstrates all key concepts in a real-world project.</p>

      <p>You’ve been on this page for <strong>{timeSpent}</strong> seconds.</p>

      <button onClick={() => setShowDetails((prev) => !prev)}>
        {showDetails ? 'Hide' : 'Show'} Developer Info
      </button>

      {showDetails && (
        <div className="dev-info">
          <h3>Developer</h3>
          <p>Name: Sharmi</p>
          <p>Role: Full Stack Developer</p>
        </div>
      )}
    </div>
  );
}

export default About;
