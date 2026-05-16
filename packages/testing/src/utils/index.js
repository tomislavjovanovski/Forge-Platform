import { render as rtlRender } from '@testing-library/react';
export function render(ui, options) {
    return rtlRender(ui, { ...options });
}
export { screen, waitFor, within } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
//# sourceMappingURL=index.js.map