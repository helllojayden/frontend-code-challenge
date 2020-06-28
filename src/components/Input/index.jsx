import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

const VALIDATE_STATUS = {
  DEFAULT: 'default',
  ERROR: 'error',
};

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      status: VALIDATE_STATUS.DEFAULT,
    };
  }

  validate = () => {
    return new Promise((resolve, reject) => {
      const { name, rule } = this.props;
      const { value } = this.state;
      const obj = {};
      if (value) {
        obj[name] = value;
        if (!rule || (rule && rule(value))) {
          this.setState({
            status: VALIDATE_STATUS.DEFAULT,
          });
          resolve(obj);
        } else {
          this.setState({
            status: VALIDATE_STATUS.ERROR,
          });
          reject(new Error('请输入正确的格式'));
        }
      } else {
        this.setState({
          status: VALIDATE_STATUS.ERROR,
        });
        reject(new Error('请输入'));
      }
    });
  };

  render() {
    const { type, placeholder, onChange } = this.props;
    const { status } = this.state;

    return (
      <div
        className={`${styles.wrap} ${
          status === VALIDATE_STATUS.ERROR ? styles.error : ''
        }`}
      >
        <input
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            this.setState(
              {
                value: e.target.value,
              },
              () => {
                onChange && onChange(this.state.value);
              }
            );
          }}
        />
      </div>
    );
  }
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  name: PropTypes.string.isRequired,
  rule: PropTypes.func,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  placeholder: '请输入',
  type: 'text',
};
