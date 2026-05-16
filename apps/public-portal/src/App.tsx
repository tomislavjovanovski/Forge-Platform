import 'tailwindcss/tailwind.css';

export default function App(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-brand-600">
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Forge Platform</h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-lg text-gray-600">Welcome to forge-platform</p>
      </main>
    </div>
  );
}
