/**
 * Patterns - Reusable frontend application patterns
 * 
 * This directory contains higher-level composable patterns that serve as
 * the foundation for application architecture, as opposed to primitive
 * components like Button or Input.
 * 
 * Patterns are organized by domain:
 * - layouts: Application structure (AppShell, PageContainer)
 * - async: State handling (AsyncSection, loading states)
 * - data: Data presentation (FilterableTable, MetricGrid)
 * - forms: Form patterns (SettingsForm, FormSection)
 * - ux: User experience utilities (ThemeSwitcher, CommandPalette)
 */

export * from './layouts';
export * from './async';
export * from './data';
export * from './forms';
export * from './ux';
