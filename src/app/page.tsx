import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="h-[100vh] flex items-center justify-center gap-8 flex-col">
      <div className="flex gap-8">
        <Link href={"/sign-in"}>
          <Button>Sign In</Button>
        </Link>
        <Link href={"/signup"}>
          <Button variant={"outline"}>Sign Up</Button>
        </Link>
      </div>
      <Link href={"/dashboard"}>
        <Button variant={"ghost"}>Go to Dashboard </Button>
      </Link>
    </div>
  );
}
