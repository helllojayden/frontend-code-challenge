import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { requestIntive } from '../../../../api';
import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import styles from './index.less';

const EMAIL_REG = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export default class InviteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      error: null,
    };
  }

  onSubmit = (params) => {
    const { loading } = this.state;
    if (loading) return;
    this.setState({ loading: true });
    requestIntive(params).then((resp) => {
      this.setState({ loading: false });
      const { status, error } = resp;
      if (status == 200) {
        const { onSuccess } = this.props;
        onSuccess && onSuccess();
      } else {
        this.setState({
          error,
        });
      }
    });
  };

  render() {
    const { loading, email, error } = this.state;
    return (
      <div className={styles.wrap}>
        <div className={styles.form}>
          <div className={styles.title}>Request an invite</div>
          <Form onSubmit={this.onSubmit}>
            <Input
              name="name"
              placeholder="Full name"
              rule={(value) => {
                return !!value && value.length >= 3;
              }}
            />
            <Input
              name="email"
              placeholder="Email"
              rule={(value) => {
                return !!value && EMAIL_REG.test(value);
              }}
              onChange={(email) => {
                this.setState({ email });
              }}
            />
            <Input
              name="confirmemail"
              placeholder="Confirm email"
              rule={(value) => {
                return !!value && EMAIL_REG.test(value) && value === email;
              }}
            />
            <Button
              type="submit"
              className={styles.button}
              loading={loading}
              loadingText="Sending, please wait..."
            >
              Send
            </Button>
            {error && <div className={styles.error}>{error}</div>}
          </Form>
        </div>
      </div>
    );
  }
}

InviteForm.propTypes = {
  onSuccess: PropTypes.func,
};
