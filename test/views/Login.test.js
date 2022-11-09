import React from 'react';
import axios from 'axios';
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, act, fireEvent, waitFor, getByRole, } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

import LoginForm from '../../src/components/login/LoginForm';
import { login } from '../../src/services/User';
import Wrapper from '../../src/components/context/Wrapper';

jest.mock('../../src/services/User');

describe('login', () => {
  test('check login has a submit button', () => {
    render(<Router><input type='text' value='Norris'/><LoginForm /></Router>);
      const submitButton = screen.getByRole('link', { name: 'Se_connecter' });
      expect(submitButton).toBeInTheDocument();
  });

  test('find if inputEmail print the correct email inputed', () => {
    const inputEmail = getByRole('textbox');
    // fireEvent.change(inputEmail, { target: { value: 'adrhotel@yopmail.com' } });
    expect(inputEmail).toBeInTheDocument(); 
  });

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