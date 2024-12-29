"use client";
import React, { useState } from "react";
import { CheckIcon, ClipboardIcon, HomeIcon } from "lucide-react";
import {
  IClientBasicInfo,
  IClientDocuments,
  IClientVisaInfo,
} from "../../schema";
import { toast } from "@/hooks/use-toast";
import ClientBasicInfoForm from "./basic-info-form";
import ClientVisaInfoForm from "./visa-info-form";
import ClientFileUploadForm from "./upload-files";

type FormData = {
  clientBasicInfo?: IClientBasicInfo;
  clientVisaInfo?: IClientVisaInfo;
  clientDocuments?: IClientDocuments;
};

const onSubmit = (formData: FormData) => {
  console.log("Form submitted with data:", formData);
  // Here you would typically send the data to your backend
};

export const ClientMultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});

  const updateForm = (stepData: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const submitForm = (lastFormData: IClientDocuments) => {
    alert("here")
    const finalFormData = {
      ...formData,
      documents: lastFormData,
    };
    onSubmit(finalFormData);
    toast({
      title: "Form Submitted Successfully",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(finalFormData, null, 2)}
          </code>
        </pre>
      ),
    });
  };
  const steps = [
    { number: 1, name: "Step 1", icon: <HomeIcon className="w-4 h-4" /> },
    { number: 2, name: "Step 2", icon: <ClipboardIcon className="w-4 h-4" /> },
    { number: 3, name: "Step 3", icon: <CheckIcon className="w-4 h-4" /> },
  ];
  return (
    <div>
      <div className="w-full max-w-2xl mx-auto p-6 space-y-6 flex justify-center">
        <div className="flex items-center justify-center w-fit ">
          {steps.map((s, index) => (
            <div key={index} className="flex items-center ">
              {/* Step */}
              <div className="flex flex-col items-center  ">
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
              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={` flex-1 w-10 md:20 transition-all border ${
                    s.number < step ? "border-black" : "border-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
        {/* Form Steps */}
        <div className="card-body">
          {step === 1 ? (
            <ClientBasicInfoForm
              formData={formData.clientBasicInfo}
              updateForm={(data) => updateForm({ clientBasicInfo: data })}
              handleNext={handleNext}
            />
          ) : step === 2 ? (
            <ClientVisaInfoForm
              formData={formData.clientVisaInfo}
              updateForm={(data) => updateForm({ clientVisaInfo: data })}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          ) : (
            <ClientFileUploadForm
              formData={formData.clientDocuments}
              updateForm={submitForm}
              handlePrevious={handlePrevious}
            />
          )}
        </div>
      </div>
    </div>
  );
};
