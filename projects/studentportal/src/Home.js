import React from 'react';

function Home({ showWelcome = true }) {
  const headingStyle = {
    color: '#4a148c',
    textAlign: 'center',
    marginTop: '40px',
  };

  return (
    <div>
      {showWelcome && <h2 style={headingStyle}>Welcome to the React Project!</h2>}
      <p style={{ textAlign: 'center', color: '#555' }}>
        Navigate using the links above to explore various features of React.
      </p>
    </div>
  );
}

export default Home;
