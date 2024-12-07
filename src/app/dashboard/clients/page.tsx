import DisplayCard from "@/components/display-card";
import PageHeaderWithoutForm from "@/components/headers/page-header-without-form";
import { withServerAuth } from "@/lib/protected-server-pages";
import { ArrowUp, Calendar } from "lucide-react";

export default withServerAuth(async function Clients() {
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
          icon={Calendar}
          title="Total Clients"
          digit={23}
        />
        <DisplayCard
          description="+5% form last Month"
          icon={Calendar}
          title="This Month"
          digit={23}
        />
                <DisplayCard
          description="-5% from last week"
          icon={Calendar}
          title="This week"
          digit={23}
        />
        <DisplayCard
          description="-3% from yesterday"
          icon={Calendar}
          title="Today"
          digit={23}
        />

      </div>
    </div>
  );
});
