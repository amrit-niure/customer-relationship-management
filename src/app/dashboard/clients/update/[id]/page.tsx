import { FC } from "react";
import { getClientAction } from "../../actions";
import FetchErrorPage from "@/components/FetchErrorPage";
import { ClientMultiStepForm, FormData } from "../../create/components/multi-step-form";
import { sanitizeData } from "@/lib/utils";
import PageHeaderWithoutForm from "@/components/headers/page-header-without-form";

interface UpdatePageProps {
  params: Promise<{ id: string }>;
}

const UpdatePage: FC<UpdatePageProps> = async ({ params }) => {
  const { id } = await params;
  const [clientData] = await getClientAction({ id });
  if (!clientData) {
    return <FetchErrorPage />;
  }
  const sanitizedClientData = sanitizeData(clientData);
  const defaultFormData: FormData = {
    clientBasicInfo: {
      id: sanitizedClientData.id,
      firstName: sanitizedClientData.firstName,
      lastName: sanitizedClientData.lastName,
      email: sanitizedClientData.email,
      phone: sanitizedClientData.phone,
      address: sanitizedClientData.address,
      isActive: sanitizedClientData.isActive,
      middleName: sanitizedClientData.middleName,
    },
    clientVisaInfo: {
      dateOfBirth: sanitizedClientData.dateOfBirth,
      firstLandedOn: sanitizedClientData.firstLandedOn,
      firstLandedVisa: sanitizedClientData.firstLandedVisa,
      passportNumber: sanitizedClientData.passportNumber,
      currentVisa: sanitizedClientData.currentVisa,
      visaExpiry: sanitizedClientData.visaExpiry,
    },
    clientDocuments: {
      files: [],
    },
  }
  return (
    <div>
       <PageHeaderWithoutForm
        header="Update Client"
        description="Update client details"
      />
     <ClientMultiStepForm defaultFormData={defaultFormData} isUpdate={true}/>
    </div>
  );
};

export default UpdatePage;
