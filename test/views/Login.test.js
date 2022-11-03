import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

import LoginForm from '../../src/components/login/LoginForm';
import { login } from '../../src/services/User';
import Wrapper from '../../src/components/context/Wrapper';

jest.mock('../../src/services/User');

describe('login', () => {
  test('check login has a submit button', () => {
    render(<Router><LoginForm /></Router>);
    try {
      screen.getByText('Se connecter');
      expect(true).toBe(true);
    } catch (err) {
      expect(true).toBe(false);
    }
  });

  test('check submit login redirect to verifyCode', async () => {
    const { 
      getByPlaceholderText, getByText, findByDisplayValue 
    } = render(
      <Wrapper>
        <Router>
          <LoginForm />
        </Router>
      </Wrapper>
    );

    await act(async () => {
      const inputEmail = getByPlaceholderText(/exemple@exemple.com/);
      fireEvent.change(inputEmail, { target: { value: 'adrhotel@yopmail.com' } });
      await findByDisplayValue(/adrhotel@yopmail.com/);

      const inputPassword = getByPlaceholderText(/mot de passe/);
      fireEvent.change(inputPassword, { target: { value: '1234' } });
      await findByDisplayValue(/1234/);

      const buttonSubmit = getByText(/Se connecter/);
      fireEvent.click(buttonSubmit);
    });

    expect(login).toHaveBeenCalledWith({
      is_partner: true,
      email: 'adrhotel@yopmail.com',
      mdp: '1234',
      browser: 'temp',
    });
  })

});