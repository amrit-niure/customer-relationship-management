import DisplayCard from "@/components/display-card";
import PageHeaderWithoutForm from "@/components/headers/page-header-without-form";
import { withServerAuth } from "@/lib/protected-server-pages";
import { Activity } from "lucide-react";
import { columns } from "./components/table/columns";
import { DataLinkTable } from "../../../components/data-table/data-link-table";
import { getAllClientsAction } from "./actions";

export default withServerAuth(async function Clients() {
  const [clients] = await getAllClientsAction();
  const data = clients ? clients : []
  return (
    <div>
      <PageHeaderWithoutForm
        description="View contact information of all associated clients"
        header="Clients"
        pagePath="clients/create"
        buttonText="Register New Client"
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
        <DataLinkTable columns={columns} data={data || []} />
      </div>
    </div>
  );
});
