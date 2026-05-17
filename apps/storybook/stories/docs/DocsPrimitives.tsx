import type { ReactNode } from 'react';

export function DocsPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}): React.ReactElement {
  return (
    <div className="forge-docs">
      <h1>{title}</h1>
      <p className="lede">{subtitle}</p>
      {children}
    </div>
  );
}

export function CardGrid({ children }: { children: ReactNode }): React.ReactElement {
  return <div className="forge-docs-grid">{children}</div>;
}

export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): React.ReactElement {
  return (
    <div className="forge-docs-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export function Callout({ children }: { children: ReactNode }): React.ReactElement {
  return <div className="forge-callout">{children}</div>;
}

export function TokenGrid({
  tokens,
}: {
  tokens: Array<{ name: string; value: string; swatch?: string }>;
}): React.ReactElement {
  return (
    <div className="forge-token-grid">
      {tokens.map((token) => (
        <div key={token.name} className="forge-token">
          {token.swatch ? (
            <div
              className="forge-token-swatch"
              style={{ background: token.swatch }}
            />
          ) : null}
          <div className="forge-token-body">
            <p className="forge-token-name">{token.name}</p>
            <div className="forge-token-value">{token.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: Array<Array<ReactNode>>;
}): React.ReactElement {
  return (
    <table className="forge-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function DoDont({
  doTitle,
  doItems,
  dontTitle,
  dontItems,
}: {
  doTitle: string;
  doItems: string[];
  dontTitle: string;
  dontItems: string[];
}): React.ReactElement {
  return (
    <div className="forge-split">
      <div className="forge-do">
        <h3>{doTitle}</h3>
        <ul>
          {doItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="forge-dont">
        <h3>{dontTitle}</h3>
        <ul>
          {dontItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ChipRow({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}): React.ReactElement {
  return (
    <div className="forge-chip-row">
      {items.map((item) => (
        <div key={item.label} className="forge-chip">
          <strong>{item.label}</strong>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export function DependencyGraph({
  columns,
}: {
  columns: Array<{
    title: string;
    nodes: Array<{ name: string; description: string }>;
  }>;
}): React.ReactElement {
  return (
    <div className="forge-graph">
      {columns.map((column) => (
        <div key={column.title} className="forge-graph-column">
          <h4>{column.title}</h4>
          {column.nodes.map((node) => (
            <div key={node.name} className="forge-graph-node">
              <div>{node.name}</div>
              <small>{node.description}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
