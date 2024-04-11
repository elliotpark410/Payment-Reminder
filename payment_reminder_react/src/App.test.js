import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App Component', () => {
  test('renders App component', () => {
    const linkElement = screen.getByText(/Payment Reminder/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('adds a new student', () => {
    const addButton = screen.getByText(/Add Student/i);
    fireEvent.click(addButton);
    const saveButton = screen.getByText(/Save/i);
    expect(saveButton).toBeInTheDocument();
  });

  test('opens edit student modal', () => {
    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);
    const editForm = screen.getByText(/Edit Student/i);
    expect(editForm).toBeInTheDocument();
  });

  // Add more tests as needed
});
