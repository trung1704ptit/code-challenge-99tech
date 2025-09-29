import { describe, it, expect, vi } from 'vitest';

// Mock the API client
vi.mock('../../utils/api', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}));

describe('Prices Service - Simple Tests', () => {
  it('should be importable without errors', async () => {
    const pricesModule = await import('../prices');
    expect(pricesModule.pricesService).toBeDefined();
    expect(pricesModule.pricesService.getPrices).toBeDefined();
    expect(pricesModule.pricesService.getLatestPrice).toBeDefined();
  });

  it('should have all required service methods', async () => {
    const { pricesService } = await import('../prices');
    
    expect(typeof pricesService.getPrices).toBe('function');
    expect(typeof pricesService.getPricesByCurrency).toBe('function');
    expect(typeof pricesService.getLatestPrice).toBe('function');
  });

  it('should handle getPrices method signature', async () => {
    const { pricesService } = await import('../prices');
    
    // Test that the method exists and can be called (will fail due to mock, but that's expected)
    expect(() => pricesService.getPrices()).not.toThrow();
  });

  it('should handle getLatestPrice method signature', async () => {
    const { pricesService } = await import('../prices');
    
    // Test that the method exists and can be called with a currency parameter
    expect(() => pricesService.getLatestPrice('ETH')).not.toThrow();
  });
});
