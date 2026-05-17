import type { Meta, StoryObj } from '@storybook/react';
import { AsyncSection } from '@forge/ui';
import { useState } from 'react';

const meta: Meta<typeof AsyncSection> = {
  title: 'Patterns/Async/AsyncSection',
  component: AsyncSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * AsyncSection handles loading, error, and empty states for async content
 * 
 * Features:
 * - Loading skeleton display
 * - Error state with custom error messages
 * - Empty state handling
 * - Customizable content for each state
 * - Dark mode support
 */
export const Default: Story = {
  args: {
    title: 'Team Members',
    description: 'Manage team members and their roles',
    children: (
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <p>Content loaded successfully</p>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    isEmpty: true,
    emptyContent: (
      <div className="text-center">
        <p className="font-semibold text-slate-900 dark:text-slate-50">No team members</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Invite your first team member to get started
        </p>
      </div>
    ),
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: new Error('Failed to fetch team members. Please try again.'),
    errorContent: (error) => (
      <div>
        <h3 className="font-semibold text-red-900 dark:text-red-50">Failed to load content</h3>
        <p className="mt-1 text-sm text-red-800 dark:text-red-200">{error.message}</p>
        <button className="mt-3 rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700">
          Retry
        </button>
      </div>
    ),
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive demo - click button to toggle states
 */
export const Interactive: Story = {
  render: (args) => {
    const [state, setState] = useState<'loading' | 'error' | 'empty' | 'success'>('success');

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {['success', 'loading', 'error', 'empty'].map((s) => (
            <button
              key={s}
              onClick={() => setState(s as any)}
              className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                state === s
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <AsyncSection
          {...args}
          isLoading={state === 'loading'}
          error={state === 'error' ? new Error('Something went wrong') : null}
          isEmpty={state === 'empty'}
        />
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};
