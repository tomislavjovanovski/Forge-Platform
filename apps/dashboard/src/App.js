import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Dashboard Application
 *
 * A minimal demo showing reusable frontend patterns:
 * - AppShell layout structure
 * - FilterableTable pattern
 * - SettingsForm pattern
 * - AsyncSection state handling
 * - Responsive behavior
 * - Dark mode support
 * - Feature flag example
 */
import { useState } from 'react';
import { AppShell, PageContainer, FilterableTable, SettingsForm, AsyncSection, ThemeSwitcher, } from '@forge/ui';
const SAMPLE_USERS = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
    { id: '3', name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
    { id: '4', name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
    { id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
];
const SETTINGS_FIELDS = [
    {
        name: 'appName',
        label: 'Application Name',
        type: 'text',
        placeholder: 'Enter app name',
        description: 'The name displayed in the header',
        defaultValue: 'Forge Platform',
        required: true,
    },
    {
        name: 'enableNotifications',
        label: 'Enable Notifications',
        type: 'checkbox',
        description: 'Allow the app to send notifications',
        defaultValue: true,
    },
    {
        name: 'theme',
        label: 'Default Theme',
        type: 'select',
        options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto (system preference)' },
        ],
        defaultValue: 'auto',
    },
    {
        name: 'description',
        label: 'Application Description',
        type: 'textarea',
        placeholder: 'Describe your application',
        description: 'Shown on the about page',
        defaultValue: 'A frontend platform engineering system with reusable UI patterns.',
    },
];
export default function App() {
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [activeTab, setActiveTab] = useState('users');
    const handleFilterUsers = (data, query) => {
        return data.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase()));
    };
    const handleSortUsers = (data, columnId, direction) => {
        const sorted = [...data].sort((a, b) => {
            const aVal = a[columnId];
            const bVal = b[columnId];
            if (aVal < bVal)
                return direction === 'asc' ? -1 : 1;
            if (aVal > bVal)
                return direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    };
    const userColumns = [
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
            accessor: (row) => (_jsx("span", { className: "inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200", children: row.role })),
            sortable: true,
        },
        {
            id: 'status',
            header: 'Status',
            accessor: (row) => (_jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`, children: row.status })),
            sortable: true,
        },
    ];
    const handleSettingsSubmit = async (data) => {
        setIsSavingSettings(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Settings saved:', data);
        setIsSavingSettings(false);
    };
    return (_jsx(AppShell, { sidebar: _jsxs("nav", { className: "space-y-2", children: [_jsxs("div", { className: "mb-4 flex items-center gap-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold", children: "FP" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-900 dark:text-slate-50", children: "Forge" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Platform" })] })] }), ['Users', 'Settings'].map((item, idx) => (_jsx("button", { onClick: () => setActiveTab(idx === 0 ? 'users' : 'settings'), className: `w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${(idx === 0 ? activeTab === 'users' : activeTab === 'settings')
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`, children: item }, item)))] }), header: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50", children: activeTab === 'users' ? 'User Management' : 'Application Settings' }), _jsx(ThemeSwitcher, {})] }), children: _jsxs(PageContainer, { children: [activeTab === 'users' && (_jsxs("div", { className: "space-y-6", children: [_jsx(AsyncSection, { isLoading: false, isEmpty: SAMPLE_USERS.length === 0, title: "Team Members", description: "Manage team members and their roles", children: _jsx(FilterableTable, { data: SAMPLE_USERS, columns: userColumns, onFilter: handleFilterUsers, onSort: handleSortUsers, showRowNumbers: true }) }), _jsxs("div", { className: "rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-50", children: "\uD83D\uDCDA Pattern Showcase" }), _jsxs("ul", { className: "mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400", children: [_jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "AppShell:" }), " Responsive layout with sidebar and header"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "FilterableTable:" }), " Sortable, searchable data display"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "AsyncSection:" }), " Loading, error, and empty state handling"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "ThemeSwitcher:" }), " Dark mode toggle with persistence"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "PageContainer:" }), " Responsive content wrapper"] })] })] })] })), activeTab === 'settings' && (_jsxs("div", { className: "space-y-6", children: [_jsx(SettingsForm, { title: "Application Settings", description: "Configure your application behavior and appearance", fields: SETTINGS_FIELDS, onSubmit: handleSettingsSubmit, isSubmitting: isSavingSettings, submitLabel: "Save Settings" }), _jsxs("div", { className: "rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-50", children: "\uD83C\uDFA8 Responsive Behavior" }), _jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: "Resize your window to see the sidebar collapse on mobile. All patterns are fully responsive and adapt to different screen sizes." })] })] }))] }) }));
}
//# sourceMappingURL=App.js.map