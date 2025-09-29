import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the SwapForm component
vi.mock('./components/SwapForm', () => ({
  default: () => <div data-testid="swap-form">SwapForm Component</div>,
}));

describe('App', () => {
  it('renders the main app with background', () => {
    render(<App />);
    
    // Check if the main container is rendered - it's the parent of the content div
    const contentDiv = screen.getByTestId('swap-form').parentElement;
    const mainContainer = contentDiv?.parentElement;
    expect(mainContainer).toHaveClass('min-h-screen');
    expect(mainContainer).toHaveClass('flex');
    expect(mainContainer).toHaveClass('items-center');
    expect(mainContainer).toHaveClass('justify-center');
  });

  it('renders the SwapForm component', () => {
    render(<App />);
    
    expect(screen.getByTestId('swap-form')).toBeInTheDocument();
    expect(screen.getByText('SwapForm Component')).toBeInTheDocument();
  });

  it('applies background image style', () => {
    render(<App />);
    
    const contentDiv = screen.getByTestId('swap-form').parentElement;
    const mainContainer = contentDiv?.parentElement;
    expect(mainContainer).toHaveStyle({
      backgroundImage: 'url(/background.webp)',
    });
  });

  it('has correct responsive classes', () => {
    render(<App />);
    
    const contentDiv = screen.getByTestId('swap-form').parentElement;
    const mainContainer = contentDiv?.parentElement;
    expect(mainContainer).toHaveClass('p-4');
    expect(mainContainer).toHaveClass('relative');
    expect(mainContainer).toHaveClass('bg-fixed');
    expect(mainContainer).toHaveClass('bg-center');
    expect(mainContainer).toHaveClass('bg-cover');
  });
});
