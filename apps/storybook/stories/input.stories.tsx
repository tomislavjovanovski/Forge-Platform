import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@forge/ui';

/**
 * Input component
 *
 * Form input element with support for various states and annotations.
 */
const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component for text entry with multiple states and variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Size of the input',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      description: 'Error message to display',
      control: 'text',
    },
    disabled: {
      description: 'Disable the input',
      control: 'boolean',
    },
    fullWidth: {
      description: 'Make input full width',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

/**
 * Input sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

/**
 * Input with label
 */
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
  },
};

/**
 * Input with error
 */
export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
  },
};

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Username must be 3-20 characters long',
  },
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'This input is disabled',
    value: 'Disabled value',
  },
};

/**
 * Input with icon
 */
export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: <span>🔍</span>,
  },
};

/**
 * Full width input
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: 'Full Width Input',
    placeholder: 'This input spans full width',
  },
};
