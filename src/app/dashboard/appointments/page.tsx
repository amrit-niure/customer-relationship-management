import { DataTable } from "@/components/data-table/data-table";
import DisplayCard from "@/components/display-card";
import PageHeaderWithForm from "@/components/headers/page-header-with-form";
import { Activity } from "lucide-react";
import React from "react";
import { columns } from "./components/table/columns";
import { withServerAuth } from "@/lib/protected-server-pages";
import { getAllAppointmentsAction } from "./actions";

export default withServerAuth(async function Appointments() {
  const [appointments] = await getAllAppointmentsAction();
  const data = appointments ? appointments : [];
  return (
    <div>
      <PageHeaderWithForm
        description="Book or assign appointments"
        header="Appointments"
        formType="APPOINTMENT"
        buttonText="New Appointment"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
        <DisplayCard
          description={` +2% form previous week`}
          icon={Activity}
          title="Total Clients"
          digit={23}
        />
        <DisplayCard
          description="+5% form last Month"
          icon={Activity}
          title="This Month"
          digit={23}
        />
        <DisplayCard
          description="-5% from last week"
          icon={Activity}
          title="This week"
          digit={23}
        />
        <DisplayCard
          description="-3% from yesterday"
          icon={Activity}
          title="Today"
          digit={23}
        />
      </div>
      <div>
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
});
