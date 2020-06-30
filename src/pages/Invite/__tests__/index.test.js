/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import '../../../../tests/__mocks__/api';
import Invite from '..';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InviteForm from '../components/InviteForm';
import Success from '../components/Success';

const defer = async (delay = 0) =>
  await act(() => new Promise((resolve) => setTimeout(resolve, delay)));

describe('page invite', () => {
  test('should show InviteForm correctly when click invite button', () => {
    const wrapper = mount(<Invite />);
    expect(wrapper.find(InviteForm).length).toBe(0);

    const RequestButton = wrapper.find(Button);
    expect(RequestButton.length).toBe(1);

    RequestButton.simulate('click');
    const InviteFormNode = wrapper.find(InviteForm);
    expect(InviteFormNode.length).toBe(1);

    const InputNodes = InviteFormNode.find(Input);
    const SendButton = InviteFormNode.find(Button);
    expect(InputNodes.length).toBe(3);
    expect(SendButton.length).toBe(1);
    expect(InputNodes.at(0).props().name).toBe('name');
    expect(InputNodes.at(1).props().name).toBe('email');
    expect(InputNodes.at(2).props().name).toBe('confirmemail');
  });

  test('should InviteForm validate fileds correctly when InviteForm submit', async () => {
    const wrapper = mount(<Invite />);
    const RequestButton = wrapper.find(Button);
    RequestButton.simulate('click');

    const InviteFormNode = wrapper.find(InviteForm);
    const SendButton = InviteFormNode.find(Button);

    SendButton.simulate('submit');
    const InputNodes = InviteFormNode.find(Input);
    InputNodes.map((node) => {
      expect(node.getDOMNode().className).toBe('wrap error');
    });

    const NameInput = InviteFormNode.find('input').at(0);
    const EmailInput = InviteFormNode.find('input').at(1);
    const ConfirmEmailInput = InviteFormNode.find('input').at(2);

    NameInput.simulate('change', { target: { value: 'a' } });
    SendButton.simulate('submit');
    InputNodes.map((node) => {
      expect(node.getDOMNode().className).toBe('wrap error');
    });

    NameInput.simulate('change', { target: { value: 'Jayden' } });
    SendButton.simulate('submit');
    InputNodes.map((node, index) => {
      if (index === 0) {
        expect(node.getDOMNode().className).toBe('wrap ');
      } else {
        expect(node.getDOMNode().className).toBe('wrap error');
      }
    });

    NameInput.simulate('change', { target: { value: 'Jayden' } });
    EmailInput.simulate('change', { target: { value: 'Jayden' } });
    ConfirmEmailInput.simulate('change', { target: { value: 'Jayden' } });
    SendButton.simulate('submit');
    InputNodes.map((node, index) => {
      if (index === 0) {
        expect(node.getDOMNode().className).toBe('wrap ');
      } else {
        expect(node.getDOMNode().className).toBe('wrap error');
      }
    });

    NameInput.simulate('change', { target: { value: 'Jayden' } });
    EmailInput.simulate('change', {
      target: { value: '13501812540@163.com' },
    });
    ConfirmEmailInput.simulate('change', {
      target: { value: '1@qq.com' },
    });
    SendButton.simulate('submit');
    InputNodes.map((node, index) => {
      if (index === 2) {
        expect(node.getDOMNode().className).toBe('wrap error');
      } else {
        expect(node.getDOMNode().className).toBe('wrap ');
      }
    });

    NameInput.simulate('change', { target: { value: 'Jayden' } });
    EmailInput.simulate('change', {
      target: { value: '13501812540@163.com' },
    });
    ConfirmEmailInput.simulate('change', {
      target: { value: '13501812540@163.com' },
    });
    SendButton.simulate('submit');
    InputNodes.map((node) => {
      expect(node.getDOMNode().className).toBe('wrap ');
    });
  });

  test('should InviteForm submit correctly', async () => {
    const wrapper = mount(<Invite />);
    const RequestButton = wrapper.find(Button);
    RequestButton.simulate('click');

    const InviteFormNode = wrapper.find(InviteForm);

    const NameInput = InviteFormNode.find('input').at(0);
    const EmailInput = InviteFormNode.find('input').at(1);
    const ConfirmEmailInput = InviteFormNode.find('input').at(2);

    NameInput.simulate('change', {
      target: {
        value: 'Jayden',
      },
    });
    EmailInput.simulate('change', {
      target: {
        value: '1@qq.com',
      },
    });
    ConfirmEmailInput.simulate('change', {
      target: {
        value: '1@qq.com',
      },
    });

    InviteFormNode.find(Button).simulate('submit');

    await defer(50);
    wrapper.update();
    expect(wrapper.find(InviteForm).find('div.error').length).toBe(1);

    NameInput.simulate('change', {
      target: {
        value: 'Jayden',
      },
    });
    EmailInput.simulate('change', {
      target: {
        value: '13501812540@163.com',
      },
    });
    ConfirmEmailInput.simulate('change', {
      target: {
        value: '13501812540@163.com',
      },
    });

    InviteFormNode.find(Button).simulate('submit');

    await defer(50);
    wrapper.update();
    const SuccessNode = wrapper.find(Success);
    expect(wrapper.find(InviteForm).length).toBe(0);
    expect(SuccessNode.length).toBe(1);

    SuccessNode.find(Button).simulate('click');
    await defer(50);
    wrapper.update();
    expect(wrapper.find(InviteForm).length).toBe(0);
    expect(wrapper.find(Success).length).toBe(0);
  });
});
