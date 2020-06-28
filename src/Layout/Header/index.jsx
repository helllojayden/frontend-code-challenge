import React from 'react';
import PropTypes from 'prop-types';
import styles from './indesx.less';

function Header(props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
