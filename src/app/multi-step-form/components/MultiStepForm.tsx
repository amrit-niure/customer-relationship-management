import React, { useState, ReactElement, cloneElement } from "react";
import { FormProvider, useFormContext } from "./FormContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  PersonalInfoFormData,
  AddressFormData,
  PreferencesFormData,
} from "./schema";
import { useToast } from "@/hooks/use-toast";

type StepProps = {
  onSubmit?: (
    data: PersonalInfoFormData | AddressFormData | PreferencesFormData
  ) => void;
  stepName?: string;
};

export interface PersonalInfoFormProps extends StepProps {}
export interface AddressFormProps extends StepProps {}
export interface PreferencesFormProps extends StepProps {}


type FormData = {
  personalInfo?: PersonalInfoFormData;
  address?: AddressFormData;
  preferences?: PreferencesFormData;
};

interface MultiStepFormProps {
  children: ReactElement<StepProps>[];
  onSubmit: (formData: FormData) => void;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  children,
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = React.Children.toArray(children) as ReactElement<StepProps>[];
  const { toast } = useToast();
  const { formData, updateFormData } = useFormContext();

  const goToNextStep = () => {
    setCurrentStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = (stepData: PersonalInfoFormData | AddressFormData | PreferencesFormData) => {
    const stepName = steps[currentStep].props.stepName?.toLowerCase() || '';
    const updatedFormData = {
      ...formData,
      [stepName]: stepData
    };
    updateFormData(stepName, stepData);

    if (currentStep === steps.length - 1) {
      onSubmit(updatedFormData);
      toast({
        title: "Form Submitted",
        description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(updatedFormData, null, 2)}</code>
        </pre>,
      });
    } else {
      goToNextStep();
    }
  };

  const currentStepElement = React.isValidElement(steps[currentStep])
    ? React.cloneElement(steps[currentStep], { onSubmit: handleSubmit })
    : null;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <span className="text-lg font-semibold">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-full ${
                  index < currentStep ? "bg-primary" : "bg-muted"
                }`}
                style={{ width: "100px" }}
              />
            )}
            <span className="mt-2 text-sm font-medium">
              {step.props.stepName || `Step ${index + 1}`}
            </span>
          </div>
        ))}
      </div>
      {currentStepElement}
      <div className="flex justify-between mt-6">
        <Button
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            const form = document.querySelector("form");
            if (form) {
              form.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              );
            }
          }}
          type="submit"
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};
