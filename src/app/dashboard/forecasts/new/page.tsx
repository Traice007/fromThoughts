import { Suspense } from "react";
import { ForecastForm } from "@/components/forecast/forecast-form";

export const metadata = { title: "New Forecast — fromThoughts" };

export default function NewForecastPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Forecast</h1>
        <p className="text-secondary mt-1">
          Build a data-driven revenue plan for your next growth target.
        </p>
      </div>
      <Suspense>
        <ForecastForm />
      </Suspense>
    </div>
  );
}
