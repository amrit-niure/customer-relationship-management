import { withServerAuth } from "@/lib/protected-server-pages";
import {  getCurrentUser } from "@/lib/session";
import React from "react";

export default withServerAuth(async function Dashboard() {
  const user = await getCurrentUser();
  return (
    <div>
      <b>Dashboard</b>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
})
