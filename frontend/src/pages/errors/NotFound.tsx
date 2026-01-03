import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted px-6">
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-medium text-muted-foreground">
          404 Error
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>

        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link to={-1 as any}>Go back</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
