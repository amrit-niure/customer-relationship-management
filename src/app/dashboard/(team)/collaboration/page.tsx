import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function Collaboration() {
  return (
    <div>
     Collaboration
    </div>
  );
})