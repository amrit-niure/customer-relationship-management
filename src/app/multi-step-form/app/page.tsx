'use client'

import React from 'react';
import { MultiStepForm } from '../components/MultiStepForm';
import { Toaster } from "@/components/ui/toaster"
import { PersonalInfoFormData, AddressFormData, PreferencesFormData } from '../schemas/formSchemas';

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
      <MultiStepForm onSubmit={handleFormSubmit} />
      <Toaster />
    </div>
  );
}

