import type {
  Meta,
  StoryObj,
  StoryFn,
} from '@storybook/react';

import {
  SettingsForm,
  type FormField,
} from '@forge/ui';

import {
  useState,
  type JSX,
  type ReactNode,
} from 'react';

const meta: Meta<typeof SettingsForm> = {
  title: 'Patterns/Forms/SettingsForm',
  component: SettingsForm,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

type SettingsFormProps = {
  title?: string;
  description?: string;
  fields?: FormField[];
  submitLabel?: string;
  showCancel?: boolean;
  isSubmitting?: boolean;
  children?: ReactNode;
  onSubmit?: (
    data: Record<string, unknown>,
  ) => Promise<void>;
};

const SAMPLE_FIELDS: FormField[] = [
  {
    name: 'appName',
    label: 'Application Name',
    type: 'text',
    placeholder: 'Enter app name',

    description:
      'The name displayed in the header',

    defaultValue: 'Forge Platform',

    required: true,
  },

  {
    name: 'email',
    label: 'Contact Email',
    type: 'email',
    placeholder: 'admin@example.com',

    defaultValue:
      'admin@example.com',

    required: true,
  },

  {
    name: 'enableNotifications',
    label: 'Enable Notifications',
    type: 'checkbox',

    description:
      'Allow the app to send notifications',

    defaultValue: true,
  },

  {
    name: 'theme',
    label: 'Default Theme',
    type: 'select',

    options: [
      {
        value: 'light',
        label: 'Light',
      },

      {
        value: 'dark',
        label: 'Dark',
      },

      {
        value: 'auto',
        label:
          'Auto (system preference)',
      },
    ],

    defaultValue: 'auto',
  },

  {
    name: 'description',
    label:
      'Application Description',

    type: 'textarea',

    placeholder:
      'Describe your application',

    description:
      'Shown on the about page',

    defaultValue:
      'A frontend platform engineering system with reusable UI patterns.',
  },
];

/**
 * SettingsForm provides a complete
 * form for application settings
 * with validation and error handling
 *
 * Features:
 * - Multiple field types
 * - Field validation support
 * - Error display
 * - Submit/cancel buttons
 * - Loading state
 * - Dark mode support
 */
export const Default: Story = {
  args: {
    title:
      'Application Settings',

    description:
      'Configure your application behavior and appearance',

    fields: SAMPLE_FIELDS,

    submitLabel:
      'Save Settings',

    showCancel: true,

    onSubmit: async (
      data: Record<
        string,
        unknown
      >,
    ): Promise<void> => {
      console.log(
        'Form submitted:',
        data,
      );

      await new Promise<void>(
        (resolve) => {
          setTimeout(
            resolve,
            1000,
          );
        },
      );
    },
  },
};

export const WithoutCancel: Story = {
  args: {
    ...Default.args,
    showCancel: false,
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
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

export const WithValidationErrors: Story = {
  args: {
    ...Default.args,

    fields: SAMPLE_FIELDS.map(
      (
        field: FormField,
      ): FormField =>
        field.name === 'email'
          ? {
              ...field,

              error:
                'Please enter a valid email address',
            }
          : field,
    ),
  },
};

function InteractiveDemo(
  args: SettingsFormProps,
): JSX.Element {
  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  return (
    <SettingsForm
      {...args}
      isSubmitting={
        isSubmitting
      }
      onSubmit={async (
        data: Record<
          string,
          unknown
        >,
      ): Promise<void> => {
        setIsSubmitting(true);

        await new Promise<void>(
          (resolve) => {
            setTimeout(
              resolve,
              2000,
            );
          },
        );

        console.log(
          'Form submitted:',
          data,
        );

        setIsSubmitting(false);
      }}
    />
  );
}

/**
 * Interactive demo
 * Try submitting the form
 * to see loading state
 */
export const Interactive: Story = {
  render: (
    args,
  ): JSX.Element => (
    <InteractiveDemo {...args} />
  ),

  args: {
    ...Default.args,
  },
};