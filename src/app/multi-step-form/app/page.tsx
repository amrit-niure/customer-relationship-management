'use client'

import React from 'react';
import { MultiStepForm } from '../components/MultiStepForm';
import { Toaster } from "@/components/ui/toaster"


export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Multi-Step Form Example</h1>
      <MultiStepForm  />
      <Toaster />
    </div>
  );
}

