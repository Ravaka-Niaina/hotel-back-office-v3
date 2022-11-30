import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { screen , render } from '@testing-library/react'
import { act } from 'react-dom/test-utils';

import RoomTypeForm from '../RoomTypeForm';

describe('insert room type', () => {
  test('expect onSubmit function to be called at button submit click', () => {
    // mock axios.post and onSubmit function
    const onSubmit = jest.fn().mockImplementation((injectedFunction) => {
      injectedFunction();
    });

    // render component
    act(() => {
      render(<RoomTypeForm onSubmit={onSubmit} />);
    });

    // click validate button
    const addButton = screen.getByRole('link', { name: 'Valider' });
    // expect onSubmit function to be called
  });
  test('all inputs should display errors if empty when validating', () => {
    // render component
    // mock axios.post and onSubmit function
    // click validate button
    // expect errors to appear
  });
});