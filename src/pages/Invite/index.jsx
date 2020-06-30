import React, { Component } from 'react';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import InviteForm from './components/InviteForm';
import Success from './components/Success';

import styles from './index.less';

const MODAL_TYPE = {
  INVITE: 'invite',
  SUCCESS: 'success',
  NONE: 'none',
};

export default class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: MODAL_TYPE.NONE,
    };
  }

  handleModal = (modalType) => {
    this.setState({ modalType });
  };

  render() {
    const { modalType } = this.state;

    return (
      <div className={styles.wrap}>
        <span>A better way</span>
        <span>to enjoy everyday.</span>
        <span>be the first to known when we launch.</span>
        <Button
          className={styles.button}
          onClick={() => {
            this.handleModal(MODAL_TYPE.INVITE);
          }}
        >
          Request in an invite
        </Button>
        <Modal>
          {modalType === MODAL_TYPE.INVITE && (
            <InviteForm
              onSuccess={() => {
                this.handleModal(MODAL_TYPE.SUCCESS);
              }}
            />
          )}
          {modalType === MODAL_TYPE.SUCCESS && (
            <Success
              onOk={() => {
                this.handleModal(MODAL_TYPE.NONE);
              }}
            />
          )}
        </Modal>
      </div>
    );
  }
}
