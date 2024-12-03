import { withServerAuth } from "@/lib/protected-server-pages";
import {  assertAuthenticated, getCurrentUser } from "@/lib/session";
import React from "react";

export default withServerAuth(async function Dashboard() {
  const user = await assertAuthenticated();
  return (
    <div>
      <b className="text-primary">Dashboard</b>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
})
