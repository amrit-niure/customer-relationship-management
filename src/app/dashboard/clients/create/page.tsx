import PageHeaderWithoutForm from "@/components/headers/page-header-without-form";
import { FC } from "react";
import CreateClientForm from "../components/create-client-form";

interface CreateProps {}

const Create: FC<CreateProps> = ({}) => {
  return (
    <div>
      <PageHeaderWithoutForm
        header="New Customer "
        description="Register new customer to our database."
      />
      <CreateClientForm />
    </div>
  );
};

export default Create;
