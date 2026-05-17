#!/usr/bin/env bash

# forge-platform Development Setup
# This script verifies the development environment

set -e

echo "🔍 Checking forge-platform development environment..."
echo ""

# Check Node version
echo "✓ Node version:"
node --version
REQUIRED_NODE="20.0.0"
ACTUAL_NODE=$(node -v | cut -d'v' -f2)
if [ "$(printf '%s\n' "$REQUIRED_NODE" "$ACTUAL_NODE" | sort -V | head -n1)" != "$REQUIRED_NODE" ]; then
  echo "  ⚠️  Node 20+ required, found $ACTUAL_NODE"
  exit 1
fi

# Check pnpm version
echo "✓ pnpm version:"
pnpm --version
REQUIRED_PNPM="9.0.0"
ACTUAL_PNPM=$(pnpm -v)
if [ "$(printf '%s\n' "$REQUIRED_PNPM" "$ACTUAL_PNPM" | sort -V | head -n1)" != "$REQUIRED_PNPM" ]; then
  echo "  ⚠️  pnpm 9+ required, found $ACTUAL_PNPM"
  exit 1
fi

# Check if node_modules exists
echo "✓ Dependencies:"
if [ -d "node_modules" ]; then
  echo "  node_modules found"
else
  echo "  Installing dependencies..."
  pnpm install
fi

# Run type check
echo ""
echo "✓ Type checking..."
pnpm type-check || {
  echo "  ⚠️  Type errors found - fix before continuing"
  exit 1
}

# Success
echo ""
echo "✅ Development environment ready!"
echo ""
echo "Quick start:"
echo "  pnpm dev              - Start all dev servers"
echo "  pnpm dev:dashboard    - Start dashboard (http://localhost:3000)"
echo "  pnpm dev:playground   - Start playground (http://localhost:3001)"
echo "  pnpm test             - Run tests"
echo "  pnpm lint             - Check code quality"
echo ""
