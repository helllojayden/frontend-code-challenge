import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

function Footer(props) {
  return <div className={styles.wrap}>{props.children}</div>;
}

Footer.propTypes = {
  children: PropTypes.node,
};

export default Footer;
