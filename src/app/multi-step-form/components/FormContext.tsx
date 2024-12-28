import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormContextType {
  formData: Record<string, any>;
  updateFormData: (stepId: string, data: Record<string, any>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const updateFormData = (stepId: string, data: Record<string, any>) => {
    setFormData(prevData => ({
      ...prevData,
      [stepId]: data
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
