import { describe, it, expect } from 'vitest';
import {
  CURRENCIES,
  DEFAULT_INPUT_CURRENCY,
  DEFAULT_OUTPUT_CURRENCY,
  VALIDATION,
  API,
  UI,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LABELS,
  ARIA_LABELS,
} from '../index';

describe('Constants', () => {
  describe('CURRENCIES', () => {
    it('should contain expected currencies', () => {
      expect(CURRENCIES).toContain('ETH');
      expect(CURRENCIES).toContain('USDC');
      expect(CURRENCIES).toContain('ATOM');
      expect(CURRENCIES).toContain('OSMO');
      expect(CURRENCIES).toContain('USD');
      expect(CURRENCIES).toContain('LUNA');
      expect(CURRENCIES).toContain('USDT');
      expect(CURRENCIES).toContain('BTC');
      expect(CURRENCIES).toContain('BLUR');
      expect(CURRENCIES).toContain('BUSD');
      expect(CURRENCIES).toContain('GMX');
      expect(CURRENCIES).toContain('STEVMOS');
    });

    it('should have correct length', () => {
      expect(CURRENCIES).toHaveLength(12);
    });
  });

  describe('DEFAULT_INPUT_CURRENCY', () => {
    it('should be USDC', () => {
      expect(DEFAULT_INPUT_CURRENCY).toBe('USDC');
    });
  });

  describe('DEFAULT_OUTPUT_CURRENCY', () => {
    it('should be ETH', () => {
      expect(DEFAULT_OUTPUT_CURRENCY).toBe('ETH');
    });
  });

  describe('VALIDATION', () => {
    it('should have correct validation values', () => {
      expect(VALIDATION.MAX_AMOUNT).toBe(1000000000);
      expect(VALIDATION.MAX_DECIMAL_PLACES).toBe(6);
      expect(VALIDATION.MIN_AMOUNT).toBe(0.000001);
    });
  });

  describe('API', () => {
    it('should have correct API configuration', () => {
      expect(API.PRICES_URL).toBe('https://interview.switcheo.com/prices.json');
      expect(API.TOKEN_ICONS_BASE_URL).toBe('https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens');
      expect(API.TIMEOUT).toBe(10000);
    });
  });

  describe('UI', () => {
    it('should have correct UI configuration', () => {
      expect(UI.EXCHANGE_RATE_DECIMAL_PLACES).toBe(4);
      expect(UI.OUTPUT_AMOUNT_DECIMAL_PLACES).toBe(6);
      expect(UI.NUMBER_FORMAT_LOCALE).toBe('en-US');
    });
  });

  describe('ERROR_MESSAGES', () => {
    it('should contain all required error messages', () => {
      expect(ERROR_MESSAGES.AMOUNT_REQUIRED).toBe('Amount is required');
      expect(ERROR_MESSAGES.INVALID_NUMBER).toBe('Please enter a valid number');
      expect(ERROR_MESSAGES.AMOUNT_TOO_SMALL).toBe('Amount must be greater than 0');
      expect(ERROR_MESSAGES.AMOUNT_TOO_LARGE).toContain('Amount too large (max: 1,000,000,000)');
      expect(ERROR_MESSAGES.TOO_MANY_DECIMALS).toContain('Too many decimal places (max: 6)');
      expect(ERROR_MESSAGES.PRICE_FETCH_ERROR).toContain('Unable to fetch prices');
      expect(ERROR_MESSAGES.CALCULATION_ERROR).toContain('Failed to calculate swap');
    });

    it('should have dynamic error messages with validation constants', () => {
      expect(ERROR_MESSAGES.AMOUNT_TOO_LARGE).toContain(VALIDATION.MAX_AMOUNT.toLocaleString());
      expect(ERROR_MESSAGES.TOO_MANY_DECIMALS).toContain(VALIDATION.MAX_DECIMAL_PLACES.toString());
    });
  });

  describe('SUCCESS_MESSAGES', () => {
    it('should contain success messages', () => {
      expect(SUCCESS_MESSAGES.SWAP_CONFIRMED).toBe('Swap Confirmed');
    });
  });

  describe('LABELS', () => {
    it('should contain all required labels', () => {
      expect(LABELS.AMOUNT_TO_SEND).toBe('Amount to send');
      expect(LABELS.AMOUNT_TO_RECEIVE).toBe('Amount to receive');
      expect(LABELS.CONFIRM_SWAP).toBe('CONFIRM SWAP');
      expect(LABELS.CURRENCY_SWAP).toBe('Currency Swap');
      expect(LABELS.SWAP_DESCRIPTION).toBe('Swap between different cryptocurrencies');
    });
  });

  describe('ARIA_LABELS', () => {
    it('should contain accessibility labels', () => {
      expect(ARIA_LABELS.SWAP_CURRENCIES).toBe('Swap currencies');
    });
  });
});
