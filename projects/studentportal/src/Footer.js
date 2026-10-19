import React from 'react';

const footerStyle = {
  backgroundColor: '#f1f1f1',
  padding: '10px',
  textAlign: 'center',
  marginTop: '20px',
  fontSize: '14px',
  top: '500px',
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>© 2025 My React Project. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
