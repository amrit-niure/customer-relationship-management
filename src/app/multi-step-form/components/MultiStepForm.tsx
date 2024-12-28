import React, { useState, ReactElement, cloneElement } from 'react';
import { FormProvider } from './FormContext';
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import { PersonalInfoFormData, AddressFormData, PreferencesFormData } from './schema';
import { useToast } from '@/hooks/use-toast';

type FormData = {
    personalInfo?: PersonalInfoFormData;
    address?: AddressFormData;
    preferences?: PreferencesFormData;
  }
  
  interface MultiStepFormProps {
    children: ReactElement<{ stepName?: string; onSubmit?: (data: any) => void }>[];
    onSubmit: (formData: FormData) => void;
  }
  
  export const MultiStepForm: React.FC<MultiStepFormProps> = ({ children, onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({});
    const steps = React.Children.toArray(children) as ReactElement<{ stepName?: string; onSubmit?: (data: any) => void }>[];
    const { toast } = useToast()
  
    const goToNextStep = () => {
      setCurrentStep(current => Math.min(current + 1, steps.length - 1));
    };
  
    const goToPreviousStep = () => {
      setCurrentStep(current => Math.max(current - 1, 0));
    };
  
    const skipStep = () => {
      goToNextStep();
    };
  
    const handleSubmit = (stepData: PersonalInfoFormData | AddressFormData | PreferencesFormData) => {
      const updatedFormData = { ...formData, [steps[currentStep].props.stepName?.toLowerCase() || '']: stepData };
      setFormData(updatedFormData);
  
      if (currentStep === steps.length - 1) {
        onSubmit(updatedFormData);
        toast({
          title: "Form Submitted",
          description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(updatedFormData, null, 2)}</code>
          </pre>,
        })
      } else {
        goToNextStep();
      }
    };
  
    return (
      <FormProvider>
        <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index < currentStep ? 'bg-primary text-primary-foreground' : 
                  index === currentStep ? 'bg-primary text-primary-foreground' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-full ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} style={{width: '100px'}} />
                )}
                <span className="mt-2 text-sm font-medium">
                  {step.props.stepName || `Step ${index + 1}`}
                </span>
              </div>
            ))}
          </div>
          {cloneElement(steps[currentStep], { onSubmit: handleSubmit })}
          <div className="flex justify-between mt-6">
            <Button
              onClick={goToPreviousStep}
              disabled={currentStep === 0}
              variant="outline"
            >
              Previous
            </Button>
            {currentStep < steps.length - 1 && (
              <Button onClick={skipStep} variant="secondary">
                Skip Step
              </Button>
            )}
            <Button
              onClick={() => {
                if (steps[currentStep].props.onSubmit) {
                  steps[currentStep].props.onSubmit({});
                }
              }}
              type="submit"
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </FormProvider>
    );
  };
  
  