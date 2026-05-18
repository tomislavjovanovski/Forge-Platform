import axe from 'axe-core';
import type { AxeResults } from 'axe-core';

export async function runAxe(
  element: HTMLElement,
  options?: axe.RunOptions
): Promise<AxeResults> {
  const results = await axe.run(element, {
    ...options,
    rules: {
      'color-contrast': { enabled: true },
    },
  });

  if (results.violations.length > 0) {
    const messages = results.violations
      .map(
        (violation) =>
          `${violation.id} (${violation.impact}): ${violation.help}\n  ${violation.nodes
            .map((node) => node.failureSummary)
            .join('\n  ')}`
      )
      .join('\n\n');

    const error = new Error(`Accessibility violations detected:\n${messages}`) as Error & {
      axeResults?: AxeResults;
    };
    error.axeResults = results;
    throw error;
  }

  return results;
}
