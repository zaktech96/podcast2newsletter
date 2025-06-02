import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Welcome to Dashboard</h3>
          <p className="text-sm text-muted-foreground">Manage your podcasts and newsletters</p>
        </div>
        <div className="p-6 pt-0">
          <p>This is your dashboard content.</p>
          <Link 
            href="/add-podcast"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4"
          >
            Add Podcast
          </Link>
        </div>
      </div>
    </div>
  );
}
