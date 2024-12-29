import React, { useState } from "react";
import { CheckIcon, ClipboardIcon, HomeIcon } from "lucide-react";
import {
  PersonalInfoFormData,
  AddressFormData,
  PreferencesFormData,
} from "../schemas/formSchemas";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { AddressForm } from "./AddressForm";
import { PreferencesForm } from "./PreferencesForm";
import { toast } from "@/hooks/use-toast";

type FormData = {
  personalInfo?: PersonalInfoFormData;
  address?: AddressFormData;
  preferences?: PreferencesFormData;
};

interface MultiStepFormProps {
  onSubmit: (formData: FormData) => void;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmit }) => {
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

  const submitForm = (preferencesData: PreferencesFormData) => {
    const finalFormData = {
      ...formData,
      preferences: preferencesData,
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
            <PersonalInfoForm
              formData={formData.personalInfo}
              updateForm={(data) => updateForm({ personalInfo: data })}
              handleNext={handleNext}
            />
          ) : step === 2 ? (
            <AddressForm
              formData={formData.address}
              updateForm={(data) => updateForm({ address: data })}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          ) : (
            <PreferencesForm
              formData={formData.preferences}
              updateForm={submitForm}
              handlePrevious={handlePrevious}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
