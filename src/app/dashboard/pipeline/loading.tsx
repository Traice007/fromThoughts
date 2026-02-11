export default function PipelineLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-32 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted rounded mt-2" />
      </div>
      <div className="bg-background border border-border rounded-xl p-6">
        <div className="h-6 w-40 bg-muted rounded mb-4" />
        <div className="h-48 bg-muted/50 rounded-xl" />
      </div>
    </div>
  );
}
