import { render as rtlRender } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof rtlRender> {
  return rtlRender(ui, { ...options });
}

export { screen, waitFor, within } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
