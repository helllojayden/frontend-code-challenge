import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

export default class Button extends Component {
  onClick = () => {
    const { loading, onClick } = this.props;
    if (!loading) {
      onClick && onClick();
    }
  };

  render() {
    const {
      className,
      type,
      children,
      loading,
      loadingText,
      // eslint-disable-next-line no-unused-vars
      onClick,
      ...props
    } = this.props;
    return (
      <button
        type={type}
        className={`${styles.button} ${
          loading ? styles.loading : ''
        } ${className}`}
        {...props}
        onClick={this.onClick}
      >
        {loading ? loadingText : children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  type: 'button',
  onClick: () => {},
  loading: false,
  loadingText: 'loading',
};
