import PageHeaderWithoutForm from "@/components/headers/page-header-without-form";
import { FC } from "react";
import { ClientMultiStepForm } from "./components/multi-step-form";


interface CreateProps {}

const Create: FC<CreateProps> = ({}) => {
  return (
    <div>
      <PageHeaderWithoutForm
        header="New Customer "
        description="Register new customer to our database."
      />
      <ClientMultiStepForm />
    </div>
  );
};

export default Create;
