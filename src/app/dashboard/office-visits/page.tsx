import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function OfficeVisits() {
  return (
    <div>
     Office Visits
    </div>
  );
})