import type {
  Meta,
  StoryObj,
  StoryFn,
  StoryContext,
} from '@storybook/react';

import { AsyncSection } from '@forge/ui';

import {
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

const meta = {
  title: 'Patterns/Async/AsyncSection',
  component: AsyncSection,
  tags: ['autodocs'],
} satisfies Meta<typeof AsyncSection>;

export default meta;

type Story = StoryObj<typeof meta>;

type AsyncState =
  | 'loading'
  | 'error'
  | 'empty'
  | 'success';


const createError = (
  message: string,
): Error => {
  const error: Error =
    new globalThis.Error(message);

  return error;
};


const fetchError = createError(
  'Failed to fetch team members. Please try again.',
);

const interactiveError = createError(
  'Something went wrong',
);



function Content(): ReactElement {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <p>
        Content loaded successfully
      </p>
    </div>
  );
}

function EmptyContent(): ReactElement {
  return (
    <div className="text-center">
      <p className="font-semibold text-slate-900 dark:text-slate-50">
        No team members
      </p>

      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Invite your first team member
        to get started
      </p>
    </div>
  );
}

interface ErrorContentProps {
  error: Error;
}

function ErrorContent({
  error,
}: ErrorContentProps): ReactElement {
  return (
    <div>
      <h3 className="font-semibold text-red-900 dark:text-red-50">
        Failed to load content
      </h3>

      <p className="mt-1 text-sm text-red-800 dark:text-red-200">
        {error.message}
      </p>

      <button className="mt-3 rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700">
        Retry
      </button>
    </div>
  );
}

const emptyContentNode: ReactNode = (
  <EmptyContent />
);

const renderErrorContent = (
  error: Error,
): ReactNode => {
  return (
    <ErrorContent error={error} />
  );
};

export const Default: Story = {
  args: {
    children: <Content />,
  },
  render: (): ReactElement => {
    return (
      <AsyncSection
        title="Team Members"
        description="Manage team members and their roles"
      >
        <Content />
      </AsyncSection>
    );
  },
};

export const Loading: Story = {
  args: {
    children: <Content />,
  },
  render: (): ReactElement => {
    return (
      <AsyncSection
        title="Team Members"
        description="Manage team members and their roles"
        isLoading
      >
        <Content />
      </AsyncSection>
    );
  },
};

export const Empty: Story = {
  args: {
    children: <Content />,
  },
  render: (): ReactElement => {
    return (
      <AsyncSection
        title="Team Members"
        description="Manage team members and their roles"
        isEmpty
        emptyContent={emptyContentNode}
      >
        <Content />
      </AsyncSection>
    );
  },
};

export const Error: Story = {
  args: {
    children: <Content />,
  },
  render: (): ReactElement => {
    return (
      <AsyncSection
        title="Team Members"
        description="Manage team members and their roles"
        error={fetchError}
        errorContent={
          renderErrorContent
        }
      >
        <Content />
      </AsyncSection>
    );
  },
};

export const DarkMode: Story = {
  args: {
    children: <Content />,
  },
  render: (args): ReactElement => {
    return (
      <div className="dark">
        <AsyncSection
          title="Team Members"
          description="Manage team members and their roles"
          {...args}
        />
      </div>
    );
  },

  decorators: [
    (story: StoryFn, context: StoryContext): ReactElement => {
      return story(context.args, context);
    },
  ],
};

function InteractiveDemo(): ReactElement {
  const [state, setState] =
    useState<AsyncState>('success');

  const states: AsyncState[] = [
    'success',
    'loading',
    'error',
    'empty',
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {states.map(
          (
            currentState: AsyncState,
          ): ReactElement => {
            return (
              <button
                key={currentState}
                onClick={(): void =>
                  setState(currentState)
                }
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                  state === currentState
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {currentState}
              </button>
            );
          },
        )}
      </div>

      <AsyncSection
        title="Team Members"
        description="Manage team members and their roles"
        isLoading={
          state === 'loading'
        }
        isEmpty={
          state === 'empty'
        }
        error={
          state === 'error'
            ? interactiveError
            : null
        }
        emptyContent={
          emptyContentNode
        }
        errorContent={
          renderErrorContent
        }
      >
        <Content />
      </AsyncSection>
    </div>
  );
}

export const Interactive: Story = {
  args: {
    children: <Content />,
  },
  render: (): ReactElement => {
    return <InteractiveDemo />;
  },
};
