'use client'

import React from 'react';
import { MultiStepForm } from './components/MultiStepForm';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { AddressForm } from './components/AddressForm';
import { Toaster } from "@/components/ui/toaster"
import { PreferencesForm } from './components/PreferencesForm';
import { PersonalInfoFormData, AddressFormData, PreferencesFormData } from './components/schema';
import { FormProvider } from './components/FormContext';


type FormData = {
    personalInfo?: PersonalInfoFormData;
    address?: AddressFormData;
    preferences?: PreferencesFormData;
  }
  export default function Home() {
    const handleFormSubmit = (formData: FormData) => {
      console.log('Form submitted with data:', formData);
      // Here you would typically send the data to your backend
    };
  
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Multi-Step Form Example</h1>
        <FormProvider>
          <MultiStepForm onSubmit={handleFormSubmit}>
            <PersonalInfoForm key="step1" stepName="Personal Info" />
            <AddressForm key="step2" stepName="Address" />
            <PreferencesForm key="step3" stepName="Preferences" />
          </MultiStepForm>
        </FormProvider>
        <Toaster />
      </div>
    );
  }