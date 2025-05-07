'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="">
      <p className="mt-2">Something went wrong.</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2"
      >
        Reload again
      </button>
    </div>
  );
}