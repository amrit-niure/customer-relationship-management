import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function Page() {
  return (
    <div>
     Page
    </div>
  );
})