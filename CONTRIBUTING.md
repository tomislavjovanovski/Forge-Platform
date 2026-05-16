# Contributing Guidelines

Welcome to forge-platform! These guidelines help maintain code quality, consistency, and collaboration.

## Getting Started

```bash
# Clone repository
git clone <repo-url>
cd forge-platform

# Install dependencies
pnpm install

# Create feature branch
git checkout -b feature/my-feature

# Start development
pnpm dev
```

## Development Process

### 1. Before Starting

- Check open issues and PRs
- Create an issue for new features/bugs
- Assign yourself to avoid duplication
- Join relevant discussions

### 2. Make Changes

```bash
# Run type checking
pnpm type-check

# Format code
pnpm format

# Run linting
pnpm lint:fix

# Run tests
pnpm test
pnpm test:coverage

# Build affected packages
turbo build --filter=<changed-package>
```

### 3. Commit Messages

Follow conventional commits:

```
feat: Add new component
fix: Resolve auth issue
docs: Update architecture guide
test: Add unit tests for Button
refactor: Simplify store logic
chore: Update dependencies
```

Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

Examples:
```
feat(ui): Add Tooltip component

- Implements Radix UI Tooltip
- Adds Tailwind styling
- Includes accessibility tests

Closes #123
```

### 4. Pull Requests

**Title**: `[type] Brief description`
- `[feat]` for features
- `[fix]` for bug fixes
- `[docs]` for documentation
- `[refactor]` for code improvements

**Description Template**:

```markdown
## Changes
- Clear list of changes
- One item per line

## Why
Explain the reasoning behind changes

## Testing
How to test these changes:
1. Step 1
2. Step 2

## Checklist
- [ ] Ran `pnpm type-check`
- [ ] Ran `pnpm lint --fix`
- [ ] Ran `pnpm test`
- [ ] Updated documentation
- [ ] Added tests for new code
- [ ] No breaking changes (or documented)

## Screenshots (if UI changes)
Attach before/after screenshots
```

## Code Standards

### TypeScript

```typescript
// ✅ DO - Explicit types
function greet(name: string): string {
  return `Hello, ${name}`;
}

// ✅ DO - Use const for immutability
const users: User[] = [];

// ✅ DO - Use interfaces for objects
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// ❌ DON'T - Use any
const data: any = fetchData(); // Type is lost

// ❌ DON'T - Implicit types
function greet(name) { // name type unknown
  return `Hello, ${name}`;
}

// ❌ DON'T - Use var
var count = 0; // Use const/let
```

### React Components

```typescript
// ✅ DO - Props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}: ButtonProps): React.ReactElement => {
  return (
    <button onClick={onClick} data-variant={variant}>
      {label}
    </button>
  );
};

// ✅ DO - Use hooks correctly
function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Fetch logic
  }, []); // Dependencies listed
  
  return { user, loading };
}

// ❌ DON'T - Unnamed components
export default function() { // How do we find this?
  return <div>Hello</div>;
}

// ❌ DON'T - Prop drilling
function Parent() {
  const user = useAuth();
  return <Child user={user} />;
}

function Child({ user }: { user: User }) {
  return <Grandchild user={user} />;
}

function Grandchild({ user }: { user: User }) {
  return <p>{user.name}</p>;
}
// Use context instead!
```

### Testing

```typescript
// ✅ DO - Descriptive test names
test('Button displays label and calls onClick', () => {
  const onClick = vi.fn();
  render(<Button label="Click me" onClick={onClick} />);
  
  const button = screen.getByRole('button', { name: 'Click me' });
  fireEvent.click(button);
  
  expect(onClick).toHaveBeenCalledOnce();
});

// ✅ DO - Test behavior, not implementation
test('form submits when valid', () => {
  render(<SignupForm />);
  userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  userEvent.type(screen.getByLabelText('Password'), 'password123');
  userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
  
  expect(mockSubmit).toHaveBeenCalled();
});

// ❌ DON'T - Test implementation details
test('Button calls handler', () => {
  const handler = vi.fn();
  const { rerender } = render(<Button onClick={handler} />);
  // Testing internals, not behavior
});

// ❌ DON'T - Forget assertions
test('loads data', async () => {
  render(<Dashboard />);
  // Missing assertion!
});
```

### Accessibility

```typescript
// ✅ DO - Use semantic HTML
<button onClick={handleClick}>Click me</button>
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ DO - Provide alt text
<img src="logo.png" alt="Company logo" />

// ✅ DO - Use aria-* appropriately
<div role="alert" aria-live="polite">
  Error message
</div>

// ❌ DON'T - Non-semantic clickables
<div onClick={handleClick}>Click me</div>

// ❌ DON'T - Missing form associations
<label>Email:</label>
<input type="email" /> {/* Not connected */}

// ❌ DON'T - Decorative images with alt text
<img src="spacer.png" alt="Spacer" />
```

## File Organization

### App Structure

```
apps/admin-dashboard/
├── src/
│   ├── pages/           # Route pages
│   │   ├── Dashboard.tsx
│   │   └── Settings.tsx
│   ├── components/      # Feature components
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── UserMenu/
│   ├── hooks/           # Custom hooks
│   │   ├── useDashboard.ts
│   │   └── useUserPreferences.ts
│   ├── store/           # State management
│   │   ├── authStore.ts
│   │   └── uiStore.ts
│   ├── services/        # API clients
│   │   ├── userService.ts
│   │   └── analyticsService.ts
│   ├── types/           # TypeScript types
│   │   ├── user.ts
│   │   └── dashboard.ts
│   ├── utils/           # Utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── e2e/                 # E2E tests
├── vite.config.ts
└── package.json
```

## Review Checklist

Before requesting review, ensure:

- [ ] All tests pass: `pnpm test`
- [ ] No linting errors: `pnpm lint`
- [ ] Type checking passes: `pnpm type-check`
- [ ] Code is formatted: `pnpm format`
- [ ] Build succeeds: `turbo build --filter=<changed>`
- [ ] Branch is up to date with main
- [ ] No console errors/warnings
- [ ] Accessibility checks pass
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or documented)

## Review Process

### What Reviewers Look For

1. **Functionality**: Does it solve the problem?
2. **Code Quality**: Follows standards? Tests adequate?
3. **Performance**: Any potential issues?
4. **Security**: Any vulnerabilities?
5. **Accessibility**: WCAG 2.1 AA compliant?
6. **Documentation**: Clear and accurate?

### How to Respond to Feedback

- Be professional and open to suggestions
- Ask clarifying questions if feedback is unclear
- Propose alternatives if you disagree
- Resolve conversations by making changes or explaining why not
- Re-request review after addressing feedback

## Common Patterns

### API Integration

```typescript
// Define service
// services/userService.ts
export const userService = {
  async getUser(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  },
};

// Use in component
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    userService.getUser(userId).then(setUser);
  }, [userId]);
  
  return user ? <div>{user.name}</div> : <Loading />;
}

// Test with MSW
test('displays user', async () => {
  const server = setupTestServer([
    http.get('/api/users/1', () => 
      HttpResponse.json(fixtures.user)
    ),
  ]);
  
  render(<UserProfile userId="1" />);
  expect(await screen.findByText('Test User')).toBeInTheDocument();
});
```

### Form Handling

```typescript
function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate
      if (!email) setErrors({ email: 'Required' });
      if (!password) setErrors({ password: 'Required' });
      
      // Submit
      await signup({ email, password });
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />
      {errors.email && <p id="email-error">{errors.email}</p>}
      
      <button type="submit">Sign up</button>
    </form>
  );
}
```

## Troubleshooting

### Git Conflicts

```bash
# Update branch
git fetch origin
git rebase origin/main

# Resolve conflicts in editor
git add .
git rebase --continue
```

### Test Failures

```bash
# Run specific test
pnpm test:watch Button.test.tsx

# Debug single test
test.only('specific test', () => {
  // Only this test runs
});
```

### Build Issues

```bash
# Clean and rebuild
pnpm clean
pnpm install
turbo build --no-cache
```

## Getting Help

1. **Documentation**: Check [README.md](./README.md), [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Discord/Slack**: Ask in dev channel
3. **Issues**: Search existing issues
4. **Code Examples**: Check tests and stories

## Recognition

Great contributions are recognized:
- Highlighted in release notes
- Added to CONTRIBUTORS.md
- Invite to maintainers group
- First to claim rewards if offered

Thank you for contributing to forge-platform! 🚀
