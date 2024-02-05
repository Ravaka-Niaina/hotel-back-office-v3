import React from 'react';
import axios from 'axios';
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, act, fireEvent, waitFor, getByRole, getByPlaceholderText, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter as Router, useNavigate, } from 'react-router-dom';

import Wrapper from "../../context/Wrapper";
import LoginForm, { utilLogin } from '../LoginForm';


describe('login', () => {
  test('check login has a submit button', () => {
    render(<Router><LoginForm /></Router>);
      const submitButton = screen.getByRole('link', { name: 'Se_connecter' });
      expect(submitButton).toBeInTheDocument();
  });

  test('find if inputEmail exists', () => {
    render(<Router><LoginForm /></Router>);
    const inputEmail = screen.getByTestId('emailAddress');
    expect(inputEmail).toBeInTheDocument();
  });

  test('find if input email can be changed', async () => {
    render(<Router><LoginForm /></Router>);
    const inputEmail = screen.getByTestId('emailAddress');
    await userEvent.type(inputEmail, 'adrhotel@yopmail.com');
    expect(inputEmail).toHaveValue('adrhotel@yopmail.com');
  });

  test('test login function', async () => {
    const onSubmit = jest.fn().mockImplementation((injectedFunction) => {
      injectedFunction();
    });
    axios.post = jest.fn().mockResolvedValue({ 
      data: {
        message: 'OK', 
        partner_id: '12345'
      }
    });
    render(<Wrapper><Router><LoginForm onSubmit={onSubmit} /></Router></Wrapper>);
    
    const inputEmail = screen.getByTestId('emailAddress');
    await userEvent.type(inputEmail, 'adrhotel@yopmail.com');
    
    const inputPassword = screen.getByTestId('password');
    await userEvent.type(inputPassword, '1234');

    const loginBtn = screen.getByText('Se connecter');
    await userEvent.click(loginBtn);
    expect(onSubmit).toBeCalled();
  });

});