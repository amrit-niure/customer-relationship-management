import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { personalInfoSchema, PersonalInfoFormData } from '../schemas/formSchemas';

interface PersonalInfoFormProps {
  formData?: PersonalInfoFormData;
  updateForm: (data: PersonalInfoFormData) => void;
  handleNext: () => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, updateForm, handleNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData || {}
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    updateForm(data);
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div className='flex items-center'>
      <Button type="submit" className='ml-auto'>Next</Button>
      </div>

    </form>
  );
};

