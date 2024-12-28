"use client";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
// import { useRouter } from "next/navigation";

interface FetchErrorPageProps {
  message?: string;
}

export default function FetchErrorPage({
  message = "Failed to fetch Client Information.",
}: FetchErrorPageProps) {
  //   const router = useRouter();
  const handleRetry = () => {
    // router.refresh();
    window.location.reload();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-red-500" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Oops! Something went wrong
        </h1>
        <p className="mt-4 text-lg text-gray-600">{message}</p>
        <div className="mt-8">
          <Button onClick={handleRetry} className="px-6 py-3">
            Try Again
          </Button>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
