"use client";
import React, { useState } from "react";
import { CheckIcon, ClipboardIcon, HomeIcon } from "lucide-react";
import {
  IClientBasicInfo,
  IClientDocuments,
  IClientFull,
  IClientVisaInfo,
} from "../../schema";
import ClientBasicInfoForm from "./basic-info-form";
import ClientVisaInfoForm from "./visa-info-form";
import ClientFileUploadForm from "./upload-files";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { createClientAction, updateClientAction } from "../../actions";
import { useRouter } from "next/navigation";

export type FormData = {
  clientBasicInfo: IClientBasicInfo;
  clientVisaInfo: IClientVisaInfo;
  clientDocuments: IClientDocuments;
};

interface ClientMultiStepFormProps {
  defaultFormData?: FormData;
  isUpdate?: boolean;
}

export const ClientMultiStepForm: React.FC<ClientMultiStepFormProps> = ({
  defaultFormData,
  isUpdate = false,
}) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const initialFormData: FormData = {
    clientBasicInfo: defaultFormData?.clientBasicInfo ?? {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    clientVisaInfo: defaultFormData?.clientVisaInfo ?? {},
    clientDocuments: defaultFormData?.clientDocuments ?? {},
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateForm = (update: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...update,
    }));

  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const { execute, isPending } = useServerAction(
    isUpdate ? updateClientAction : createClientAction,
    {
      onSuccess() {
        if(isUpdate) {
          toast("The client record is updated successfully");
        }else{
          toast("The client record is created successfully");
        }
        router.push("../");
      },
      onError(result) {
        toast(result.err.message);
      },
    }
  );

  const onSubmit = async (formData: FormData) => {
    console.log("This is the form data ", formData)
    const payload: IClientFull = {
      clientBasicInfo: formData.clientBasicInfo,
      clientVisaInfo: formData.clientVisaInfo,
      clientDocuments: formData.clientDocuments,
    };
    if (isUpdate && defaultFormData?.clientBasicInfo?.id) {
      execute({...payload });
    } else {
      execute(payload);
    }
  };

  const submitForm = (lastFormData: IClientDocuments) => {
    const finalFormData: FormData = {
      ...formData,
      clientDocuments: lastFormData,
    };
    onSubmit(finalFormData);
  };

  const steps = [
    { number: 1, name: "Step 1", icon: <HomeIcon className="w-4 h-4" /> },
    { number: 2, name: "Step 2", icon: <ClipboardIcon className="w-4 h-4" /> },
    { number: 3, name: "Step 3", icon: <CheckIcon className="w-4 h-4" /> },
  ];

  return (
    <div>
      <div className="w-full max-w-2xl mx-auto p-6 space-y-6 flex justify-center">
        <div className="flex items-center justify-center w-fit">
          {steps.map((s, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg transition-all border-2 ${
                    s.number <= step
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {s.icon}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 w-10 md:20 transition-all border ${
                    s.number < step ? "border-black" : "border-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
        <div className="card-body">
          {step === 1 ? (
            <ClientBasicInfoForm
              formData={formData}
              updateForm={(data) => updateForm({ clientBasicInfo: data })}
              handleNext={handleNext}
            />
          ) : step === 2 ? (
            <ClientVisaInfoForm
              formData={formData}
              updateForm={(data) => updateForm({ clientVisaInfo: data })}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          ) : (
            <ClientFileUploadForm
              formData={formData}
              updateForm={submitForm}
              handlePrevious={handlePrevious}
              isPending={isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
};
