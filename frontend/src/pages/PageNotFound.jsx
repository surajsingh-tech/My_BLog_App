import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 
    bg-gradient-to-br from-zinc-100 via-white to-zinc-200 
    dark:from-zinc-900 dark:via-zinc-950 dark:to-black">

      <Card className="w-full max-w-md text-center shadow-2xl border border-border bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl">
        <CardContent className="p-8">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-muted">
              <AlertTriangle className="h-6 w-6 text-foreground" />
            </div>
          </div>

          {/* 404 */}
          <h1 className="text-7xl font-extrabold tracking-tight 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
          text-transparent bg-clip-text">
            404
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            The page you’re looking for doesn’t exist or may have been moved.
            Please check the URL or return to the homepage.
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/">
              <Button className="w-full">
                Go to Home
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              Go Back
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}