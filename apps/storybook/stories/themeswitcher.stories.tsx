import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from '@forge/ui';
import { useState } from 'react';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Patterns/UX/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ThemeSwitcher provides a button to toggle between light and dark themes
 * 
 * Features:
 * - System preference detection
 * - Persistent storage (localStorage)
 * - Smooth transitions
 * - Accessible
 * - Automatic dark/light mode detection
 */
export const Default: Story = {
  args: {},
};

export const DarkMode: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="dark bg-slate-950 p-8">
        <Story />
      </div>
    ),
  ],
};

export const WithBackground: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
            Theme switcher integrated in a card:
          </p>
          <Story />
        </div>
      </div>
    ),
  ],
};

/**
 * Interactive demo - toggle the theme
 */
export const Interactive: Story = {
  render: (args) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                Current theme: <code className="font-mono text-blue-600 dark:text-blue-400">{theme}</code>
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Click the toggle to switch between light and dark mode
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
  },
};
