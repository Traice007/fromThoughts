export default function OpportunitiesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-muted rounded-lg" />
        <div className="h-4 w-72 bg-muted rounded mt-2" />
      </div>

      <div>
        <div className="h-6 w-44 bg-muted rounded mb-4" />
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-background border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-20 bg-muted rounded-full" />
                <div className="h-6 w-16 bg-muted rounded-full" />
                <div className="h-6 w-16 bg-muted rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-muted rounded mb-2" />
              <div className="h-4 w-32 bg-muted rounded mb-3" />
              <div className="h-16 bg-muted rounded-lg mb-4" />
              <div className="flex gap-3">
                <div className="h-9 w-40 bg-muted rounded-lg" />
                <div className="h-9 w-32 bg-muted rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
