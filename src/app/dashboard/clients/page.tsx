import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function Clients() {
  return (
    <div>
     Clients
    </div>
  );
})