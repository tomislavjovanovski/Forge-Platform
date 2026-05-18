import type {
  Meta,
  StoryObj,
  StoryFn,
} from '@storybook/react';

import { ThemeSwitcher } from '@forge/ui';

import {
  useState,
  type JSX,
  type ReactNode,
} from 'react';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Patterns/UX/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

type ThemeMode =
  | 'light'
  | 'dark';

type ThemeSwitcherProps = {
  theme?: ThemeMode;
  onChange?: (
    theme: ThemeMode,
  ) => void;
  children?: ReactNode;
};

/**
 * ThemeSwitcher provides a button
 * to toggle between light and dark themes
 *
 * Features:
 * - System preference detection
 * - Persistent storage
 * - Smooth transitions
 * - Accessible
 * - Automatic theme detection
 */
export const Default: Story = {
  args: {},
};

export const DarkMode: Story = {
  args: {},

  decorators: [
    (
      Story: StoryFn,
    ): JSX.Element => (
      <div className="dark bg-slate-950 p-8">
        <Story />
      </div>
    ),
  ],
};

export const WithBackground: Story = {
  args: {},

  decorators: [
    (
      Story: StoryFn,
    ): JSX.Element => (
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Theme switcher integrated
            in a card:
          </p>

          <Story />
        </div>
      </div>
    ),
  ],
};

function InteractiveDemo(
  args: ThemeSwitcherProps,
): JSX.Element {
  const [theme, setTheme] =
    useState<ThemeMode>('light');

  return (
    <div
      className={
        theme === 'dark'
          ? 'dark'
          : ''
      }
    >
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-50">
              Current theme:{' '}
              <code className="font-mono text-blue-600 dark:text-blue-400">
                {theme}
              </code>
            </p>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Click the toggle to switch
              between light and dark mode
            </p>
          </div>

          <ThemeSwitcher
            {...args}
            theme={theme}
            onChange={setTheme}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive demo
 * Toggle the theme
 */
export const Interactive: Story = {
  render: (
    args,
  ): JSX.Element => (
    <InteractiveDemo {...args} />
  ),
};
