import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <section className="relative w-full  overflow-hidden">

      {/* Hero Container */}
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-12  text-center">

        {/* Subtle radial background */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--primary)/0.08),transparent_45%)]" />

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          Scalable backends.
          <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Scale beyond your limits
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Build, deploy, and scale backend infrastructure effortlessly.
          Designed for teams who want performance without operational overhead.
        </p>

        {/* Call to action */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="px-8">
            <Link to="/sign-up">
            Get started
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            View docs
          </Button>
        </div>

        {/* Product Preview */}
        <div className="relative mt-20 mx-auto max-w-full md:max-w-5xl px-4">

          <div className="rounded-2xl border bg-background/80 backdrop-blur shadow-xl overflow-hidden">

            {/* Fake App Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/40">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            {/* Fake App Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-left">

              {/* Logs */}
              <div className="rounded-lg border bg-muted/30 p-4 text-sm font-mono">
                <p>POST /auth/login</p>
                <p className="text-foreground">200 OK — 45ms</p>
                <p className="mt-2">GET /users</p>
                <p className="text-foreground">200 OK — 18ms</p>
                <p className="mt-2">POST /payments</p>
                <p className="text-foreground">201 Created — 62ms</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Requests</p>
                  <p className="text-2xl font-bold">12.4M</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Latency</p>
                  <p className="text-2xl font-bold">42ms</p>
                </div>
                <div className="col-span-2 rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-2xl font-bold">99.99%</p>
                </div>
              </div>

            </div>
          </div>

          {/* Centered controlled glow */}
          <div className="pointer-events-none absolute left-1/2 transform -translate-x-1/2 -bottom-24 h-64 w-[200%] max-w-[2000px] bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-3xl" />

        </div>
      </div>
    </section>
  );
};

export default Main;
