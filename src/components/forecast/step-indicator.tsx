"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: { title: string; description: string }[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <li
              key={step.title}
              className={cn(
                "relative flex-1",
                index !== steps.length - 1 && "pr-8 sm:pr-20"
              )}
            >
              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div
                  className="absolute top-4 left-0 -right-4 sm:-right-12 h-0.5"
                  aria-hidden="true"
                >
                  <div
                    className={cn(
                      "h-full w-full",
                      isCompleted ? "bg-primary" : "bg-border"
                    )}
                  />
                </div>
              )}

              {/* Step circle and text */}
              <div className="relative flex flex-col items-center group">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    isCompleted && "bg-primary text-white",
                    isCurrent && "border-2 border-primary bg-background text-primary",
                    !isCompleted && !isCurrent && "border-2 border-border bg-background text-secondary"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    stepNumber
                  )}
                </span>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium hidden sm:block",
                    isCurrent ? "text-primary" : "text-secondary"
                  )}
                >
                  {step.title}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
