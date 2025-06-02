'use client';

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Financial Overview</h2>
          <p>Your financial information will appear here.</p>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium leading-none">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter amount"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
