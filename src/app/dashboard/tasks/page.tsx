import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function Tasks() {
  return (
    <div>
     Tasks
    </div>
  );
})