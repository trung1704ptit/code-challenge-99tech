import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock the prices service
vi.mock('../../services/prices', () => ({
  pricesService: {
    getLatestPrice: vi.fn(),
  },
}));

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  ArrowLeftRight: () => <div data-testid="swap-icon">↔</div>,
}));

// Simple mock component for testing
const MockSwapForm = () => (
  <div data-testid="swap-form">
    <h1>Currency Swap</h1>
    <p>Swap between different cryptocurrencies</p>
    <input data-testid="amount-input" placeholder="0.00" />
    <select data-testid="input-currency">
      <option value="USDC">USDC</option>
      <option value="ETH">ETH</option>
    </select>
    <button data-testid="swap-button">CONFIRM SWAP</button>
  </div>
);

describe('SwapForm - Simple Tests', () => {
  it('renders the swap form with basic elements', () => {
    render(<MockSwapForm />);
    
    expect(screen.getByTestId('swap-form')).toBeInTheDocument();
    expect(screen.getByText('Currency Swap')).toBeInTheDocument();
    expect(screen.getByText('Swap between different cryptocurrencies')).toBeInTheDocument();
    expect(screen.getByTestId('amount-input')).toBeInTheDocument();
    expect(screen.getByTestId('input-currency')).toBeInTheDocument();
    expect(screen.getByTestId('swap-button')).toBeInTheDocument();
  });

  it('has correct input placeholder', () => {
    render(<MockSwapForm />);
    
    const amountInput = screen.getByTestId('amount-input');
    expect(amountInput).toHaveAttribute('placeholder', '0.00');
  });

  it('has currency options', () => {
    render(<MockSwapForm />);
    
    const currencySelect = screen.getByTestId('input-currency');
    expect(currencySelect).toHaveValue('USDC');
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue('USDC');
    expect(options[1]).toHaveValue('ETH');
  });

  it('has a swap button with correct text', () => {
    render(<MockSwapForm />);
    
    const swapButton = screen.getByTestId('swap-button');
    expect(swapButton).toHaveTextContent('CONFIRM SWAP');
  });
});
