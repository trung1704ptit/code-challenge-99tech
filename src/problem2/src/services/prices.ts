import apiClient from '../utils/api';

// Type for price data from the API
export interface PriceData {
  currency: string;
  date: string;
  price: number;
}

// Prices service
export const pricesService = {
  // Fetch all prices from the API
  async getPrices(): Promise<PriceData[]> {
    try {
      const response = await apiClient.get<PriceData[]>('https://interview.switcheo.com/prices.json');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch prices:', error);
      throw error;
    }
  },

  // Get prices for a specific currency
  async getPricesByCurrency(currency: string): Promise<PriceData[]> {
    try {
      const allPrices = await this.getPrices();
      return allPrices.filter(price => price.currency === currency);
    } catch (error) {
      console.error(`Failed to fetch prices for ${currency}:`, error);
      throw error;
    }
  },

  // Get latest price for a currency
  async getLatestPrice(currency: string): Promise<PriceData | null> {
    try {
      const prices = await this.getPricesByCurrency(currency);
      if (prices.length === 0) return null;
      
      // Sort by date descending and return the latest
      return prices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    } catch (error) {
      console.error(`Failed to fetch latest price for ${currency}:`, error);
      throw error;
    }
  },

  // Get average price for a currency
  async getAveragePrice(currency: string): Promise<number | null> {
    try {
      const prices = await this.getPricesByCurrency(currency);
      if (prices.length === 0) return null;
      
      const sum = prices.reduce((total, price) => total + price.price, 0);
      return sum / prices.length;
    } catch (error) {
      console.error(`Failed to calculate average price for ${currency}:`, error);
      throw error;
    }
  }
};
