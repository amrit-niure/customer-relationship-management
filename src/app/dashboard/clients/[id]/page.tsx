import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClientAction } from "../actions";
import FetchErrorPage from "@/components/FetchErrorPage";
import ClientProfileCard from "../components/client-profile-card";

export default async function ClientProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [profile] = await getClientAction({ id });
  if (!profile) {
    return <FetchErrorPage />;
  }
  return (
    <div className="w-full flex md:flex-row flex-col gap-6">
      <ClientProfileCard data={profile} />
      <div className="w-full">
        <Tabs defaultValue="Office Visits" className="bg-primary-secondary">
          <TabsList className="w-full">
            <TabsTrigger value="Office Visits">Office Visits</TabsTrigger>
            {["Activities", "Visa", "Mail", "Documents", "Notes"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className=" rounded-none"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="Office Visits">
            Tabs Content of Office Visits
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
