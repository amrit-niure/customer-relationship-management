import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function Shifts() {
  return (
    <div>
     Shifts
    </div>
  );
})