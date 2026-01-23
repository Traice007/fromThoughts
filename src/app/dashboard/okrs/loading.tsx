export default function OkrsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-24 bg-muted rounded-lg" />
          <div className="h-4 w-64 bg-muted rounded mt-2" />
        </div>
        <div className="h-10 w-40 bg-muted rounded-lg" />
      </div>

      {/* OKR cards skeleton */}
      <div className="space-y-8">
        {[...Array(2)].map((_, groupIndex) => (
          <div key={groupIndex}>
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-40 bg-muted rounded" />
              <div className="h-4 w-24 bg-muted rounded" />
            </div>
            <div className="grid gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-muted rounded-lg" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-5 w-20 bg-muted rounded-full" />
                        <div className="h-4 w-16 bg-muted rounded" />
                      </div>
                      <div className="h-6 w-3/4 bg-muted rounded mb-2" />
                      <div className="h-4 w-32 bg-muted rounded" />
                    </div>
                    <div className="h-6 w-6 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
