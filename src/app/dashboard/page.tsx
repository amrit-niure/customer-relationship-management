import PageHeaderWithoutForm from "@/components/headers/page-header-without-form";
import { withServerAuth } from "@/lib/protected-server-pages";
import {  assertAuthenticated } from "@/lib/session";
import React from "react";

export default withServerAuth(async function Dashboard() {
  await assertAuthenticated();
  return (
    <div>
     <PageHeaderWithoutForm header="Dashboard" description="View common reports and analytics" />
    </div>
  );
})
