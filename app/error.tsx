"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to sentry later if implemented
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-400" aria-hidden="true" />
          <h1 className="mt-4 text-3xl font-bold text-gray-100 sm:text-4xl">Oops! Something went wrong</h1>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <Button onClick={reset}>Try again</Button>
          <Link href="/" passHref>
            <Button className="bg-white/90 hover:bg-white/100 text-black">Return to homepage</Button>
          </Link>
        </div>
        {error.message && (
          <div className="mt-6 border-t border-gray-700 pt-6">
            <h3 className="text-sm font-medium text-gray-400">Error details:</h3>
            <pre className="mt-2 text-sm text-red-300 bg-gray-900 p-4 rounded overflow-auto">{error.message}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
