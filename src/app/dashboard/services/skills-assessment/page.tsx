import { withServerAuth } from "@/lib/protected-server-pages";

export default withServerAuth(async function SkillsAssessment() {
  return (
    <div>
     Skills Assessment
    </div>
  );
})