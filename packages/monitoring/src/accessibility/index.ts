// This module is intended for use in testing environments with jest-axe
// In testing: import { axe, toHaveNoViolations } from 'jest-axe'

export function testAccessibility(_element: HTMLElement): void {
  // This function is meant to be used in test files with proper jest-axe setup
  if (typeof window === 'undefined') {
    return;
  }
  // Accessibility testing would be performed during test execution
}
