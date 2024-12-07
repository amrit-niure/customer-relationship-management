import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function Enquiries() {
  return (
    <div>
     Enquiries
    </div>
  );
})