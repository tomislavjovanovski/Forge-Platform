import type {
  Meta,
  StoryObj,
} from '@storybook/react';
import { useState, type JSX } from 'react';import type { ComponentProps } from 'react';import { Dialog, Button } from '@forge/ui';

/**
 * Dialog component
 *
 * Modal dialog with backdrop, focus management,
 * and accessibility features.
 */
const meta = {
  title: 'Components/Dialog',

  component: Dialog,

  parameters: {
    docs: {
      description: {
        component:
          'A modal dialog component with proper accessibility and focus management.',
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

type DialogWithTriggerProps = Omit<ComponentProps<typeof Dialog>, 'isOpen' | 'onOpenChange'>;

/**
 * Dialog trigger component for stories
 */
function DialogWithTrigger(
  props: DialogWithTriggerProps,
): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={(): void => setOpen(true)}>
        Open Dialog
      </Button>

      <Dialog
        {...props}
        isOpen={open}
        onOpenChange={setOpen}
      >
        {props.children}
      </Dialog>
    </>
  );
}

/**
 * Default dialog
 */
export const Default: Story = {
  args: {
    title: 'Dialog Title',
    children: <p>This is a dialog content.</p>,
    isOpen: false,
    onOpenChange: (): void => {},
  },
  render: (): JSX.Element => (
    <DialogWithTrigger
      title="Dialog Title"
    >
      <p>This is a dialog content.</p>
    </DialogWithTrigger>
  ),
};

/**
 * Dialog with footer
 */
export const WithFooter: Story = {
  args: {
    title: 'Confirm Action',
    children: <p>Are you sure you want to proceed?</p>,
    footer: (
      <>
        <Button variant="secondary">
          Cancel
        </Button>

        <Button variant="primary">
          Confirm
        </Button>
      </>
    ),
    isOpen: false,
    onOpenChange: (): void => {},
  },
  render: (): JSX.Element => (
    <DialogWithTrigger
      title="Confirm Action"
      footer={
        <>
          <Button variant="secondary">
            Cancel
          </Button>

          <Button variant="primary">
            Confirm
          </Button>
        </>
      }
    >
      <p>
        Are you sure you want to proceed?
      </p>
    </DialogWithTrigger>
  ),
};

/**
 * Dialog sizes
 */
export const Sizes: Story = {
  args: {
    isOpen: false,
    onOpenChange: (): void => {},
    title: 'Dialog Size Story',
    children: <p>Dialog size content.</p>,
  },
  render: (): JSX.Element => (
    <div className="flex flex-wrap gap-4">
      <DialogWithTrigger
        size="sm"
        title="Small Dialog"
      >
        <p>Small dialog content</p>
      </DialogWithTrigger>

      <DialogWithTrigger
        size="md"
        title="Medium Dialog"
      >
        <p>Medium dialog content</p>
      </DialogWithTrigger>

      <DialogWithTrigger
        size="lg"
        title="Large Dialog"
      >
        <p>Large dialog content</p>
      </DialogWithTrigger>

      <DialogWithTrigger
        size="xl"
        title="Extra Large Dialog"
      >
        <p>Extra large dialog content</p>
      </DialogWithTrigger>
    </div>
  ),
};

/**
 * Dialog with form
 */
export const WithForm: Story = {
  args: {
    title: 'Create New Item',
    children: (
      <form className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="item-name"
            className="mb-1 block text-sm font-medium"
          >
            Name
          </label>

          <input
            id="item-name"
            type="text"
            placeholder="Item name"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="item-description"
            className="mb-1 block text-sm font-medium"
          >
            Description
          </label>

          <textarea
            id="item-description"
            placeholder="Item description"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
      </form>
    ),
    isOpen: false,
    onOpenChange: (): void => {},
  },
  render: (): JSX.Element => (
    <DialogWithTrigger
      title="Create New Item"
      footer={
        <>
          <Button variant="secondary">
            Cancel
          </Button>

          <Button variant="primary">
            Create
          </Button>
        </>
      }
    >
      <form className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="item-name"
            className="mb-1 block text-sm font-medium"
          >
            Name
          </label>

          <input
            id="item-name"
            type="text"
            placeholder="Item name"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="item-description"
            className="mb-1 block text-sm font-medium"
          >
            Description
          </label>

          <textarea
            id="item-description"
            placeholder="Item description"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
      </form>
    </DialogWithTrigger>
  ),
};

/**
 * Dialog without close button
 */
export const NoCloseButton: Story = {
  args: {
    title: 'Important Notice',
    children: (
      <p>
        This dialog cannot be closed by clicking
        the X button.
      </p>
    ),
    showClose: false,
    isOpen: false,
    onOpenChange: (): void => {},
  },
  render: (): JSX.Element => (
    <DialogWithTrigger
      title="Important Notice"
      showClose={false}
      footer={
        <Button
          variant="primary"
          onClick={(): void => {}}
        >
          I Understand
        </Button>
      }
    >
      <p>
        This dialog cannot be closed by clicking
        the X button.
      </p>
    </DialogWithTrigger>
  ),
};
