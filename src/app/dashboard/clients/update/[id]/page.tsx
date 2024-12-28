import PageHeaderWithoutForm from "@/components/headers/page-header-without-form";
import { FC } from "react";
import CreateClientForm from "../../components/create-client-form";
import { getClientAction } from "../../actions";
import FetchErrorPage from "@/components/FetchErrorPage";

interface UpdatePageProps {
  params: Promise<{ id: string }>;
}

const UpdatePage: FC<UpdatePageProps> = async ({ params }) => {
  const { id } = await params;
  const [clientData] = await getClientAction({ id });
  if (!clientData) {
    return <FetchErrorPage />;
  }
  return (
    <div>
      <PageHeaderWithoutForm
        header="Update Customer "
        description="Update customer details"
      />
      <CreateClientForm initialValues={clientData} isUpdate={true} />
    </div>
  );
};

export default UpdatePage;
