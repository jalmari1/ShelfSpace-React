import React from 'react';
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div style={styles.banner}>
      <h1 style={styles.title}>ShelfSpace</h1>
      <h2 style={styles.slogan}>"Organize, Explore, Engage with Your Books"</h2>
    </div>
  );
};

const styles = {
  banner: {
    textAlign: 'center',
    padding: '50px 20px',

    backgroundImage: 'linear-gradient( 68.6deg,  rgba(79,183,131,1) 14.4%, rgba(254,235,151,1) 92.7% )',
    width: '100%',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2.5em',
    margin: '0',
  },
  slogan: {
    fontSize: '1.5em',
    color: '#6c757d',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Banner;