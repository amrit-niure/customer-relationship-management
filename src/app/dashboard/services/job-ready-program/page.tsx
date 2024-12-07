import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function JobReadyProgram() {
  return (
    <div>
     Job Ready Program
    </div>
  );
})