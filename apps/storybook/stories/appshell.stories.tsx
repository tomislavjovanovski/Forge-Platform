import type {
  Meta,
  StoryObj,
  StoryFn,
} from '@storybook/react';

import { AppShell } from '@forge/ui';

import type { JSX } from 'react';

const meta: Meta<typeof AppShell> = {
  title: 'Patterns/Layouts/AppShell',

  component: AppShell,

  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

function SampleSidebar(): JSX.Element {
  return (
    <nav className="space-y-2">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
          FP
        </div>

        <div>
          <p className="font-semibold">
            Forge
          </p>

          <p className="text-xs text-slate-500">
            Platform
          </p>
        </div>
      </div>

      {[
        'Dashboard',
        'Settings',
        'Help',
      ].map(
        (item: string): JSX.Element => (
          <button
            key={item}
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {item}
          </button>
        ),
      )}
    </nav>
  );
}

function SampleHeader(): JSX.Element {
  return (
    <div>
      <h1 className="text-lg font-semibold">
        Dashboard
      </h1>
    </div>
  );
}

function SampleContent(): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold">
          Welcome
        </h2>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          The AppShell pattern provides
          a complete application layout
          structure with responsive
          sidebar and header.
        </p>
      </div>
    </div>
  );
}

/**
 * AppShell provides the primary
 * layout structure for applications
 *
 * Features:
 * - Responsive sidebar
 * - Fixed header
 * - Flexible content area
 * - Optional footer
 * - Dark mode support
 */
export const Default: Story = {
  args: {
    sidebar: <SampleSidebar />,

    header: <SampleHeader />,

    children: <SampleContent />,
  },
};

export const WithFooter: Story = {
  args: {
    sidebar: <SampleSidebar />,

    header: <SampleHeader />,

    children: <SampleContent />,

    footer: (
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
        <p>
          © 2024 Forge Platform
        </p>

        <p>Version 1.0.0</p>
      </div>
    ),
  },
};

export const NoSidebar: Story = {
  args: {
    header: <SampleHeader />,

    children: <SampleContent />,
  },
};

export const DarkMode: Story = {
  args: {
    sidebar: <SampleSidebar />,

    header: <SampleHeader />,

    children: <SampleContent />,
  },

  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },

  decorators: [
    (
      Story: StoryFn,
    ): JSX.Element => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
