import DisplayCard from "@/components/display-card";
import PageHeaderWithForm from "@/components/headers/page-header-with-form";
import { withServerAuth } from "@/lib/protected-server-pages";
import { Activity } from "lucide-react";
import { getAllOfficeVisitsAction } from "./actions";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./components/table/columns";

export default withServerAuth(async function OfficeVisits() {
  const [officeVisits] = await getAllOfficeVisitsAction();
  const data = officeVisits ? officeVisits : [];
  console.log("Office Visits", data);
  return (
    <div>
      <PageHeaderWithForm
        description="Book or assign appointments"
        header="Office Visits"
        formType="OFFFICE_VISIT"
        buttonText="New Office Visit"
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
