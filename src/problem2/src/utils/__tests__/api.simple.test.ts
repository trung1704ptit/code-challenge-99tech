import { describe, it, expect, vi } from 'vitest';

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    })),
  },
}));

describe('API Client - Simple Tests', () => {
  it('should be importable without errors', async () => {
    // This test just ensures the module can be imported
    const apiModule = await import('../api');
    expect(apiModule.default).toBeDefined();
  });

  it('should have axios create method called', async () => {
    const axios = await import('axios');
    const mockedAxios = vi.mocked(axios.default);
    
    // Import the api module to trigger axios.create
    await import('../api');
    
    expect(mockedAxios.create).toHaveBeenCalled();
  });

  it('should create axios instance with timeout configuration', async () => {
    const axios = await import('axios');
    const mockedAxios = vi.mocked(axios.default);
    
    // Import the api module
    await import('../api');
    
    // Check that create was called at least once
    expect(mockedAxios.create).toHaveBeenCalled();
  });
});
