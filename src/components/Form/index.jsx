import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

import styles from './index.less';

export default class Form extends Component {
  constructor(props) {
    super(props);
  }

  renderChild = () => {
    const { children } = this.props;
    const refs = {};
    this._refs = refs;

    return React.Children.map(children, (child, index) => {
      if (child && child.type && child.type === Input) {
        let ref = React.createRef();
        refs['input_' + index] = ref;
        return React.cloneElement(child, {
          ref,
        });
      } else {
        return child;
      }
    });
  };

  validate = () => {
    const refs = this._refs;
    const promises = [];
    for (let item in refs) {
      const current = refs[item].current;
      if (current) {
        promises.push(current.validate());
      }
    }
    return Promise.all(promises);
  };

  doSubmit = (e) => {
    const { onSubmit } = this.props;
    e.preventDefault();
    this.validate().then(
      (values) => {
        let formData = {};
        for (let value of values) {
          formData = { ...formData, ...value };
        }
        onSubmit(formData);
      },
      // eslint-disable-next-line no-unused-vars
      (errors) => {}
    );
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { className, children, ...props } = this.props;
    return (
      <form
        className={`${styles.wrap} ${className}`}
        {...props}
        onSubmit={this.doSubmit}
      >
        {this.renderChild()}
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  className: '',
  onSubmit: () => {},
};
