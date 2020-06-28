import React from 'react';
import PropTypes from 'prop-types';
import styles from './indesx.less';

function Footer(props) {
  return <div className={styles.wrap}>{props.children}</div>;
}

Footer.propTypes = {
  children: PropTypes.node,
};

export default Footer;
