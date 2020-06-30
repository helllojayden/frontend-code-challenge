import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

function Content(props) {
  return <div className={styles.wrap}>{props.children}</div>;
}

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;
