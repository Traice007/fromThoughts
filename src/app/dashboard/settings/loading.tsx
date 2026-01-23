export default function SettingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="h-8 w-28 bg-muted rounded-lg" />
        <div className="h-4 w-48 bg-muted rounded mt-2" />
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Settings form skeleton */}
        <div className="bg-background border border-border rounded-xl p-6">
          <div className="h-6 w-32 bg-muted rounded mb-4" />
          <div className="space-y-4">
            <div>
              <div className="h-4 w-16 bg-muted rounded mb-2" />
              <div className="h-12 w-full bg-muted rounded-lg" />
            </div>
            <div>
              <div className="h-4 w-16 bg-muted rounded mb-2" />
              <div className="h-12 w-full bg-muted rounded-lg" />
            </div>
            <div className="h-10 w-32 bg-muted rounded-lg" />
          </div>
        </div>

        {/* Password form skeleton */}
        <div className="bg-background border border-border rounded-xl p-6">
          <div className="h-6 w-40 bg-muted rounded mb-4" />
          <div className="space-y-4">
            <div className="h-12 w-full bg-muted rounded-lg" />
            <div className="h-12 w-full bg-muted rounded-lg" />
            <div className="h-12 w-full bg-muted rounded-lg" />
            <div className="h-10 w-40 bg-muted rounded-lg" />
          </div>
        </div>

        {/* Account info skeleton */}
        <div className="bg-background border border-border rounded-xl p-6">
          <div className="h-6 w-44 bg-muted rounded mb-4" />
          <div className="space-y-4">
            <div>
              <div className="h-4 w-12 bg-muted rounded mb-1" />
              <div className="h-5 w-48 bg-muted rounded" />
            </div>
            <div>
              <div className="h-4 w-24 bg-muted rounded mb-1" />
              <div className="h-5 w-32 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
