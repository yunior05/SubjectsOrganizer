import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import styles from './styles.scss';

function App({ children }) {
  return (
    <div>
      {children}
    </div>
    
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
