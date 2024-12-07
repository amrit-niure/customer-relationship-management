import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function Mails() {
  return (
    <div>
     Mails
    </div>
  );
})