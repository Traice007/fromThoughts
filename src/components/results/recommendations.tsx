import { Lightbulb, CheckCircle } from "lucide-react";

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-bold">Immediate Actions</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex-shrink-0">
              {index + 1}
            </div>
            <p className="text-sm">{recommendation}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <CheckCircle className="h-4 w-4 text-accent" />
          <span>Start with the highest priority items and work your way down</span>
        </div>
      </div>
    </div>
  );
}
