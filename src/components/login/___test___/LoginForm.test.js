import React from 'react';
import axios from 'axios';
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, act, fireEvent, waitFor, getByRole, getByPlaceholderText, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter as Router} from 'react-router-dom';

import LoginForm from '../LoginForm';
import { login } from '../../../services/User';
import Wrapper from '../../context/Wrapper';

jest.mock('../../src/services/User');

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

  test()

  // test('check submit login redirect to verifyCode', async () => {
  //   const { 
  //     getByPlaceholderText, getByText, findByDisplayValue 
  //   } = render(
  //     <Wrapper>
  //       <Router>
  //         <LoginForm />
  //       </Router>
  //     </Wrapper>
  //   );
      

  //     const inputPassword = screen.getByPlaceholderText(/mot de passe/);
  //     fireEvent.change(inputPassword, { target: { value: '1234' } });
  //     await findByDisplayValue(/1234/);

  //     const buttonSubmit = screen.getByText(/Se connecter/);
  //     fireEvent.click(buttonSubmit);

  //   expect(login).toHaveBeenCalledWith({
  //     is_partner: true,
  //     email: 'adrhotel@yopmail.com',
  //     mdp: '1234',
  //     browser: 'temp',
  //   });
  // })

});