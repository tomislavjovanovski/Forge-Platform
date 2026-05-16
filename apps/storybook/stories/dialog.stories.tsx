import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from '../src/components';
import { Button } from '../src/components';

/**
 * Dialog component
 *
 * Modal dialog with backdrop, focus management, and accessibility features.
 */
const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component: 'A modal dialog component with proper accessibility and focus management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description: 'Whether dialog is open',
      control: 'boolean',
    },
    title: {
      description: 'Dialog title',
      control: 'text',
    },
    size: {
      description: 'Size of the dialog',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Dialog trigger component for stories
 */
function DialogWithTrigger(props: React.ComponentProps<typeof Dialog>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog {...props} isOpen={open} onOpenChange={setOpen} />
    </>
  );
}

/**
 * Default dialog
 */
export const Default: Story = {
  render: (args) => (
    <DialogWithTrigger
      {...args}
      title="Dialog Title"
      children={<p>This is a dialog content.</p>}
    />
  ),
};

/**
 * Dialog with footer
 */
export const WithFooter: Story = {
  render: (args) => (
    <DialogWithTrigger
      {...args}
      title="Confirm Action"
      children={<p>Are you sure you want to proceed?</p>}
      footer={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </>
      }
    />
  ),
};

/**
 * Dialog sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <DialogWithTrigger size="sm" title="Small Dialog" children={<p>Small dialog content</p>} />
      <DialogWithTrigger size="md" title="Medium Dialog" children={<p>Medium dialog content</p>} />
      <DialogWithTrigger size="lg" title="Large Dialog" children={<p>Large dialog content</p>} />
      <DialogWithTrigger size="xl" title="Extra Large Dialog" children={<p>Extra large dialog content</p>} />
    </div>
  ),
};

/**
 * Dialog with form
 */
export const WithForm: Story = {
  render: (args) => (
    <DialogWithTrigger
      {...args}
      title="Create New Item"
      children={
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" placeholder="Item name" className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea placeholder="Item description" className="w-full px-3 py-2 border rounded-lg" />
          </div>
        </form>
      }
      footer={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Create</Button>
        </>
      }
    />
  ),
};

/**
 * Dialog without close button
 */
export const NoCloseButton: Story = {
  render: (args) => (
    <DialogWithTrigger
      {...args}
      title="Important Notice"
      showClose={false}
      children={<p>This dialog cannot be closed by clicking the X button.</p>}
      footer={
        <Button variant="primary" onClick={() => {}}>
          I Understand
        </Button>
      }
    />
  ),
};
