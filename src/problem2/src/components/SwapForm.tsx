import React, { useState } from 'react';
import { pricesService } from '../services/prices';
import { ArrowLeftRight } from 'lucide-react';
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
} from '../constants';

interface SwapFormProps {
  className?: string;
}

const SwapFormEnhanced: React.FC<SwapFormProps> = ({ className = '' }) => {
  const [inputAmount, setInputAmount] = useState<string>('');
  const [outputAmount, setOutputAmount] = useState<string>('');
  const [inputCurrency, setInputCurrency] = useState<string>(DEFAULT_INPUT_CURRENCY);
  const [outputCurrency, setOutputCurrency] = useState<string>(DEFAULT_OUTPUT_CURRENCY);
  const [error, setError] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isSwapConfirmed, setIsSwapConfirmed] = useState<boolean>(false);
  const [confirmedInputAmount, setConfirmedInputAmount] = useState<string>('');
  const [confirmedInputCurrency, setConfirmedInputCurrency] = useState<string>('');

  // Helper function to get token icon URL with fallback
  const getTokenIconUrl = (currency: string): string => {
    return `${API.TOKEN_ICONS_BASE_URL}/${currency}.svg`;
  };

  // Enhanced input validation
  const validateInput = (amount: string): boolean => {
    setInputError('');
    
    if (!amount || amount.trim() === '') {
      setInputError(ERROR_MESSAGES.AMOUNT_REQUIRED);
      return false;
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      setInputError(ERROR_MESSAGES.INVALID_NUMBER);
      return false;
    }
    
    if (numAmount <= 0) {
      setInputError(ERROR_MESSAGES.AMOUNT_TOO_SMALL);
      return false;
    }
    
    if (numAmount > VALIDATION.MAX_AMOUNT) {
      setInputError(ERROR_MESSAGES.AMOUNT_TOO_LARGE);
      return false;
    }
    
    // Check for too many decimal places
    const decimalPlaces = (amount.split('.')[1] || '').length;
    if (decimalPlaces > VALIDATION.MAX_DECIMAL_PLACES) {
      setInputError(ERROR_MESSAGES.TOO_MANY_DECIMALS);
      return false;
    }
    
    return true;
  };

  // Enhanced swap calculation with better error handling
  const calculateSwap = async () => {
    if (!inputAmount || !inputCurrency || !outputCurrency) return;
    
    // Validate input first
    if (!validateInput(inputAmount)) return;
    
    setError('');
    
    try {
      // Get latest prices for both currencies
      const [inputPriceData, outputPriceData] = await Promise.all([
        pricesService.getLatestPrice(inputCurrency),
        pricesService.getLatestPrice(outputCurrency)
      ]);

      if (!inputPriceData || !outputPriceData) {
        setError(ERROR_MESSAGES.PRICE_FETCH_ERROR);
        return;
      }

      // Calculate output amount and exchange rate
      const inputValueUSD = parseFloat(inputAmount) * inputPriceData.price;
      const calculatedOutputAmount = inputValueUSD / outputPriceData.price;
      const rate = inputPriceData.price / outputPriceData.price;
      
      setExchangeRate(rate);
      setOutputAmount(calculatedOutputAmount.toFixed(UI.OUTPUT_AMOUNT_DECIMAL_PLACES));
      
    } catch (err) {
      setError(ERROR_MESSAGES.CALCULATION_ERROR);
      console.error('Swap calculation error:', err);
    }
  };

  // Handle confirm swap
  const handleConfirmSwap = async () => {
    if (!inputAmount || !inputCurrency || !outputCurrency) return;
    
    // Validate input first
    if (!validateInput(inputAmount)) return;
    
    // Store the confirmed values
    setConfirmedInputAmount(inputAmount);
    setConfirmedInputCurrency(inputCurrency);
    setIsSwapConfirmed(true);
    
    // Calculate the swap
    await calculateSwap();
  };

  // Swap currencies handler
  const handleSwapCurrencies = () => {
    const tempCurrency = inputCurrency;
    const tempAmount = inputAmount;
    
    setInputCurrency(outputCurrency);
    setOutputCurrency(tempCurrency);
    setInputAmount(outputAmount);
    setOutputAmount(tempAmount);
    setExchangeRate(0);
    setIsSwapConfirmed(false); // Reset confirmation when swapping
  };

  // Format number with proper separators
  const formatNumber = (num: string): string => {
    if (!num) return '';
    const number = parseFloat(num);
    return number.toLocaleString(UI.NUMBER_FORMAT_LOCALE, {
      minimumFractionDigits: 0,
      maximumFractionDigits: UI.OUTPUT_AMOUNT_DECIMAL_PLACES
    });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl p-4 md:p-8 w-full max-w-sm mx-auto sm:max-w-md lg:max-w-lg ${className}`}>
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{LABELS.CURRENCY_SWAP}</h1>
        <p className="text-sm md:text-base text-gray-600">{LABELS.SWAP_DESCRIPTION}</p>
      </div>
      
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Input Amount Section */}
        <div className="mb-6">
          <label htmlFor="input-amount" className="block text-sm font-semibold text-gray-700 mb-3">
            {LABELS.AMOUNT_TO_SEND}
          </label>
          <div className="relative">
            <input
              id="input-amount"
              type="number"
              step="0.000001"
              placeholder="0.00"
              value={inputAmount}
              onChange={(e) => {
                setInputAmount(e.target.value);
                setInputError('');
                setIsSwapConfirmed(false); // Reset confirmation when input changes
              }}
              className={`w-full px-4 md:px-6 py-3 md:py-4 text-lg md:text-xl border-2 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 text-gray-900 bg-gray-50 transition-all duration-200 ${
                inputError ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
              aria-describedby={inputError ? 'input-error' : undefined}
              aria-invalid={inputError ? 'true' : 'false'}
            />
            
            {/* Currency Selector */}
            <select
              value={inputCurrency}
              onChange={(e) => {
                setInputCurrency(e.target.value);
                setExchangeRate(0);
                setIsSwapConfirmed(false); // Reset confirmation when currency changes
              }}
              className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer pr-8 md:pr-10"
            >
              {CURRENCIES.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            
            {/* Token Icon */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img 
                src={getTokenIconUrl(inputCurrency)} 
                alt={inputCurrency}
                className="w-5 h-5 md:w-6 md:h-6"
              />
            </div>
          </div>
          
          {/* Input Error */}
          {inputError && (
            <div id="input-error" className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {inputError}
            </div>
          )}
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={handleSwapCurrencies}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-3 transition-all duration-200 transform hover:scale-105 shadow-lg"
            aria-label={ARIA_LABELS.SWAP_CURRENCIES}
          >
            <ArrowLeftRight />
          </button>
        </div>

        {/* Output Amount Section */}
        <div className="mb-6">
          <label htmlFor="output-amount" className="block text-sm font-semibold text-gray-700 mb-3">
            {LABELS.AMOUNT_TO_RECEIVE}
          </label>
          <div className="relative">
            <input
              id="output-amount"
              type="text"
              placeholder="0.00"
              value={formatNumber(outputAmount)}
              readOnly
              className="w-full px-6 py-4 text-xl border-2 border-gray-200 rounded-xl text-gray-900 bg-gray-100"
            />
            
            {/* Currency Selector */}
            <select
              value={outputCurrency}
              onChange={(e) => {
                setOutputCurrency(e.target.value);
                setExchangeRate(0);
                setIsSwapConfirmed(false); // Reset confirmation when currency changes
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer pr-10"
            >
              {CURRENCIES.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            
            {/* Token Icon */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <img 
                src={getTokenIconUrl(outputCurrency)} 
                alt={outputCurrency}
                className="w-6 h-6"
              />
            </div>
          </div>
          
          {/* Exchange Rate Display */}
          {exchangeRate > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              1 {inputCurrency} = {exchangeRate.toFixed(UI.EXCHANGE_RATE_DECIMAL_PLACES)} {outputCurrency}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg text-red-700 text-sm flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleConfirmSwap}
          disabled={!inputAmount || !!inputError || !!error}
          className="w-full bg-gradient-to-r from-blue-600  cursor-pointer to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl transition-all duration-200 transform hover:scale-102 shadow-lg disabled:hover:scale-100 flex items-center justify-center text-sm md:text-base"
        >
          {LABELS.CONFIRM_SWAP}
        </button>
      </form>

      {/* Additional Info - Only show after confirm swap */}
      {isSwapConfirmed && outputAmount && !error && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-700">
            <strong>{SUCCESS_MESSAGES.SWAP_CONFIRMED}:</strong> You'll receive {formatNumber(outputAmount)} {outputCurrency} for {formatNumber(confirmedInputAmount)} {confirmedInputCurrency}
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapFormEnhanced;
