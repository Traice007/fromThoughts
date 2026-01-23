export default function BillingLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="h-8 w-24 bg-muted rounded-lg" />
        <div className="h-4 w-64 bg-muted rounded mt-2" />
      </div>

      {/* Current plan skeleton */}
      <div className="bg-background border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-4 w-48 bg-muted rounded mt-2" />
          </div>
          <div className="text-right">
            <div className="h-6 w-24 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded mt-2" />
          </div>
        </div>
      </div>

      {/* Plans skeleton */}
      <div>
        <div className="h-6 w-36 bg-muted rounded mb-4" />
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-background border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-muted rounded-lg" />
                <div className="h-6 w-20 bg-muted rounded" />
              </div>
              <div className="h-8 w-24 bg-muted rounded mb-2" />
              <div className="h-4 w-40 bg-muted rounded mb-6" />
              <div className="space-y-3 mb-6">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 w-full bg-muted rounded" />
                ))}
              </div>
              <div className="h-12 w-full bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
