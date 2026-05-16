import 'tailwindcss/tailwind.css';

export default function App(): React.ReactElement {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main className="mx-auto py-6 sm:px-6 lg:px-8">
        <p className="text-gray-600">Welcome to forge-platform admin dashboard</p>
      </main>
    </div>
  );
}
