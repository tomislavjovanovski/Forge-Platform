import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@forge/ui';

/**
 * Button component
 *
 * Primary interactive element with multiple variants and sizes.
 * Supports loading, disabled, and icon states.
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style of the button',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'ghost'],
    },
    size: {
      description: 'Size of the button',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    isLoading: {
      description: 'Show loading spinner',
      control: 'boolean',
    },
    disabled: {
      description: 'Disable the button',
      control: 'boolean',
    },
    fullWidth: {
      description: 'Make button full width',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button
 */
export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

/**
 * Button variants
 */
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

/**
 * Button sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Processing...',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

/**
 * With icon (icon would be passed as JSX)
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button icon={<span>→</span>}>With icon</Button>
      <Button iconEnd={<span>✓</span>}>With end icon</Button>
    </div>
  ),
};
