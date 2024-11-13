import { assertAuthenticated } from "@/lib/session";
import React from "react";

export default async function Dashboard() {
  // const user = await assertAuthenticated();
  return (
    <div>
      <b>Dashboard</b>
      {/* <p>{JSON.stringify(user, null, 2)}</p> */}
    </div>
  );
}
