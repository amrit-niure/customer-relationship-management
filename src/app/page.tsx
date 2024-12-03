import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[100vh] flex items-center justify-center  flex-col px-4">
      <div className="mx-auto my-auto max-w-6xl">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap0 relative">
          {/* Heading */}
          <div className="col-span-full md:col-span-2 border-y border-muted-foreground/30 border-dashed py-8">
            <h1 className=" font-extrabold tracking-tight text-4xl md:text-5xl text-center">
              Efficient Client Record Management Software
            </h1>
          </div>

          {/* Description */}
          <div className="col-span-full md:col-span-2 border-b border-muted-foreground/30  border-dashed py-4">
            <p className="text-sm md:text-lg text-center max-w-3xl mx-auto">
              Simplify{" "}
              <span className="font-semibold ">
                tracking, organizing, and analyzing
              </span>{" "}
              client information with a modern, user-friendly platform. Boost
              <span className="font-semibold">
                productivity and collaboration
              </span>{" "}
              with powerful tools tailored for client-focused businesses.
            </p>
          </div>

          <div className="hidden md:block absolute -top-20 left-28 h-[550px] w-px border border-dashed"></div>
          <div className="hidden md:block absolute -top-20 right-28 h-[550px] w-px border border-dashed"></div>

          <div className="hidden md:block absolute -bottom-6 left-96 h-[160px] w-px border border-dashed"></div>
          <div className="hidden md:block absolute -bottom-6 right-96 h-[160px] w-px border border-dashed"></div>

          {/* Buttons and Command */}
          <div className="col-span-full md:col-span-2 border-b border-dashed border-muted-foreground/30 py-4 flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="flex gap-8">
                <Link href={"/sign-in"}>
                  <Button className="rounded-none">Sign In</Button>
                </Link>
              </div>
              <Link href={"/dashboard"}>
                <Button variant={"outline"} className="rounded-none">
                  Go to Dashboard{" "}
                </Button>
              </Link>
            </div>
            <div className="rounded-lg bg-gray-50 px-4 py-0 text-sm text-gray-500 font-mono">
              ▲ ~ Let's get started!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
