"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md w-full bg-destructive/10 border border-destructive/20 p-6 rounded-lg text-center">
        <h2 className="text-xl font-bold text-destructive mb-4">Application Error</h2>
        <p className="text-sm text-muted-foreground mb-4">
          The server encountered an error while trying to render this page or perform an action.
        </p>
        <div className="bg-background p-4 rounded text-left overflow-auto text-xs text-red-500 font-mono mb-6 max-h-64 break-words whitespace-pre-wrap">
          {error.message || JSON.stringify(error)}
        </div>
        <Button onClick={() => reset()} className="w-full">
          Try Again
        </Button>
      </div>
    </div>
  );
}
