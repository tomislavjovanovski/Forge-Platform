import type {
  Meta,
  StoryObj,
  StoryFn,
} from '@storybook/react';

import {
  FilterableTable,
  type Column,
} from '@forge/ui';

import type { JSX } from 'react';

const meta: Meta<typeof FilterableTable> = {
  title: 'Patterns/Data/FilterableTable',
  component: FilterableTable,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const SAMPLE_DATA: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'Active',
  },

  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'Active',
  },

  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    role: 'Viewer',
    status: 'Inactive',
  },

  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'Editor',
    status: 'Active',
  },

  {
    id: '5',
    name: 'Eve Davis',
    email: 'eve@example.com',
    role: 'Admin',
    status: 'Active',
  },

  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@example.com',
    role: 'Viewer',
    status: 'Inactive',
  },
];

const columns: Column<User>[] = [
  {
    id: 'name',
    header: 'Name',

    accessor: (
      row: User,
    ): string => row.name,

    sortable: true,
  },

  {
    id: 'email',
    header: 'Email',

    accessor: (
      row: User,
    ): string => row.email,

    sortable: true,
  },

  {
    id: 'role',
    header: 'Role',

    accessor: (
      row: User,
    ): JSX.Element => (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {row.role}
      </span>
    ),

    sortable: true,
  },

  {
    id: 'status',
    header: 'Status',

    accessor: (
      row: User,
    ): JSX.Element => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          row.status === 'Active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}
      >
        {row.status}
      </span>
    ),

    sortable: true,
  },
];

/**
 * FilterableTable displays
 * tabular data with built-in
 * filtering, sorting,
 * and responsive behavior
 *
 * Features:
 * - Searchable rows
 * - Sortable columns
 * - Responsive scrolling
 * - Row numbering
 * - Custom cell rendering
 * - Dark mode support
 */
export const Default: Story = {
  args: {
    data: SAMPLE_DATA,

    columns,

    showRowNumbers: true,

    onFilter: (
      data: User[],
      query: string,
    ): User[] =>
      data.filter(
        (
          item: User,
        ): boolean =>
          item.name
            .toLowerCase()
            .includes(
              query.toLowerCase(),
            ) ||
          item.email
            .toLowerCase()
            .includes(
              query.toLowerCase(),
            ),
      ),

    onSort: (
      data: User[],
      columnId: string,
      direction: 'asc' | 'desc',
    ): User[] => {
      const sorted: User[] = [
        ...data,
      ].sort(
        (
          a: User,
          b: User,
        ): number => {
          const aVal =
            a[
              columnId as keyof User
            ];

          const bVal =
            b[
              columnId as keyof User
            ];

          if (aVal < bVal) {
            return direction ===
              'asc'
              ? -1
              : 1;
          }

          if (aVal > bVal) {
            return direction ===
              'asc'
              ? 1
              : -1;
          }

          return 0;
        },
      );

      return sorted;
    },
  },
};

export const WithoutRowNumbers: Story = {
  args: {
    ...Default.args,
    showRowNumbers: false,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
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

/**
 * Interactive test:
 * Try clicking column headers
 * to sort and use the search
 * input to filter rows
 */
export const Interactive: Story = {
  args: {
    ...Default.args,
  },
};
