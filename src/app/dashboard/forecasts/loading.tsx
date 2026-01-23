export default function ForecastsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-32 bg-muted rounded-lg" />
          <div className="h-4 w-64 bg-muted rounded mt-2" />
        </div>
        <div className="h-10 w-36 bg-muted rounded-lg" />
      </div>

      {/* Forecast cards skeleton */}
      <div className="grid gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-background border border-border rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-6 w-48 bg-muted rounded" />
                  <div className="h-5 w-20 bg-muted rounded-full" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-4 w-20 bg-muted rounded" />
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="h-4 w-16 bg-muted rounded" />
                  <div className="h-4 w-24 bg-muted rounded" />
                </div>
              </div>
              <div className="h-6 w-6 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
