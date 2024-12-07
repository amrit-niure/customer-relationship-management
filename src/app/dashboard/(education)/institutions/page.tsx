import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function Institutions() {
  return (
    <div>
     Institutions
    </div>
  );
})