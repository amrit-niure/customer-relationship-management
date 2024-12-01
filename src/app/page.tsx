import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="h-[100vh] flex items-center justify-center gap-8 flex-col">
      <div className="flex gap-8">
        <Link href={"/sign-in"}>
          <Button className="rounded-none">Sign In</Button>
        </Link>
      </div>
      <Link href={"/dashboard"}>
        <Button variant={"outline"} className="rounded-none">Go to Dashboard </Button>
      </Link>
    </div>
  );
}
