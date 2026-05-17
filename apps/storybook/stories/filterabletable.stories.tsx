import type { Meta, StoryObj } from '@storybook/react';
import { FilterableTable, type Column } from '@forge/ui';

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
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: '3', name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: '4', name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  { id: '6', name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Inactive' },
];

const columns: Column<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessor: (row) => row.name,
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessor: (row) => row.email,
    sortable: true,
  },
  {
    id: 'role',
    header: 'Role',
    accessor: (row) => (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {row.role}
      </span>
    ),
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: (row) => (
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
 * FilterableTable displays tabular data with built-in filtering, sorting, and responsive behavior
 * 
 * Features:
 * - Searchable/filterable rows
 * - Sortable columns (click to toggle asc/desc)
 * - Responsive horizontal scroll on mobile
 * - Row numbering option
 * - Custom cell rendering
 * - Dark mode support
 */
export const Default: Story = {
  args: {
    data: SAMPLE_DATA,
    columns,
    showRowNumbers: true,
    onFilter: (data, query) =>
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase()),
      ),
    onSort: (data, columnId, direction) => {
      const sorted = [...data].sort((a, b) => {
        const aVal = a[columnId as keyof User];
        const bVal = b[columnId as keyof User];
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
      });
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
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive test: Try clicking column headers to sort, type in the search box to filter
 */
export const Interactive: Story = {
  args: {
    ...Default.args,
  },
};
