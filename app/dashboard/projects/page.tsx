import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Link 
          href="/dashboard/projects/new"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          New Project
        </Link>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p>Your projects will appear here.</p>
      </div>
    </div>
  );
}
