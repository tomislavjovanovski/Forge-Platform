import { render as rtlRender, RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return rtlRender(ui, { ...options });
}

export { screen, waitFor, within } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
