import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function Students() {
  return (
    <div>
     Students
    </div>
  );
})