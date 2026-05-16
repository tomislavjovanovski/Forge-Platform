import '@testing-library/jest-dom';

// Setup global test configuration
global.ResizeObserver = class ResizeObserver {
  observe() {
    // Mock implementation
  }

  unobserve() {
    // Mock implementation
  }

  disconnect() {
    // Mock implementation
  }
};
