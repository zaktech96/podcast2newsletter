import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Success!</h1>
      <p className="text-lg text-muted-foreground mb-8">Your action was completed successfully.</p>
      <Link 
        href="/dashboard"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
