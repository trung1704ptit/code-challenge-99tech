// Currency swap constants
export const CURRENCIES = [
  'ETH', 
  'USDC', 
  'ATOM', 
  'OSMO', 
  'USD', 
  'LUNA', 
  'USDT', 
  'BTC', 
  'BLUR', 
  'BUSD', 
  'GMX', 
  'STEVMOS'
] as const;

// Default currency values
export const DEFAULT_INPUT_CURRENCY = 'USDC';
export const DEFAULT_OUTPUT_CURRENCY = 'ETH';

// Validation constants
export const VALIDATION = {
  MAX_AMOUNT: 1000000000,
  MAX_DECIMAL_PLACES: 6,
  MIN_AMOUNT: 0.000001,
} as const;

// API constants
export const API = {
  PRICES_URL: 'https://interview.switcheo.com/prices.json',
  TOKEN_ICONS_BASE_URL: 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens',
  TIMEOUT: 10000, // 10 seconds
} as const;

// UI constants
export const UI = {
  EXCHANGE_RATE_DECIMAL_PLACES: 4,
  OUTPUT_AMOUNT_DECIMAL_PLACES: 6,
  NUMBER_FORMAT_LOCALE: 'en-US',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  AMOUNT_REQUIRED: 'Amount is required',
  INVALID_NUMBER: 'Please enter a valid number',
  AMOUNT_TOO_SMALL: 'Amount must be greater than 0',
  AMOUNT_TOO_LARGE: `Amount too large (max: ${VALIDATION.MAX_AMOUNT.toLocaleString()})`,
  TOO_MANY_DECIMALS: `Too many decimal places (max: ${VALIDATION.MAX_DECIMAL_PLACES})`,
  PRICE_FETCH_ERROR: 'Unable to fetch prices for the selected currencies. Some tokens may not have price data.',
  CALCULATION_ERROR: 'Failed to calculate swap. Please check your connection and try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SWAP_CONFIRMED: 'Swap Confirmed',
} as const;

// Form labels
export const LABELS = {
  AMOUNT_TO_SEND: 'Amount to send',
  AMOUNT_TO_RECEIVE: 'Amount to receive',
  CONFIRM_SWAP: 'CONFIRM SWAP',
  CURRENCY_SWAP: 'Currency Swap',
  SWAP_DESCRIPTION: 'Swap between different cryptocurrencies',
} as const;

// Accessibility labels
export const ARIA_LABELS = {
  SWAP_CURRENCIES: 'Swap currencies',
} as const;
