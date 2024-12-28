import React from 'react';
import { useFormContext } from './FormContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { personalInfoSchema, PersonalInfoFormData } from './schema';

interface PersonalInfoFormProps {
    onSubmit?: (data: PersonalInfoFormData) => void;
    stepName?: string;
  }
  
  export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSubmit }) => {
    const { formData, updateFormData } = useFormContext();
    const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormData>({
      resolver: zodResolver(personalInfoSchema),
      defaultValues: formData.personalInfo || {}
    });
  
    const onSubmitForm = (data: PersonalInfoFormData) => {
      updateFormData('personalInfo', data);
      if (onSubmit) onSubmit(data);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register('fullName')}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </form>
    );
  };
  
  