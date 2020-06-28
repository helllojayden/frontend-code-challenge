import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button';

import styles from './index.less';

export default class Success extends Component {
  render() {
    const { onOk } = this.props;
    return (
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.title}>All done!</div>
          <div className={styles.msg}>
            You will be one of the first to experience Broccoli & Co. when we
            launch.
          </div>
          <Button
            type="submit"
            className={styles.button}
            onClick={() => {
              onOk && onOk();
            }}
          >
            OK
          </Button>
        </div>
      </div>
    );
  }
}

Success.propTypes = {
  onOk: PropTypes.func,
};
