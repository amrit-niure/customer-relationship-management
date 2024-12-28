import React from 'react';
import { useFormContext } from './FormContext';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateClientFormProps {
  onSubmit: (data: Record<string, any>) => void;
}

export const CreateClientForm: React.FC<CreateClientFormProps> = ({ onSubmit }) => {
  const { formData, updateFormData } = useFormContext();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData.createClient || {}
  });

  const onSubmitForm = (data: Record<string, any>) => {
    updateFormData('createClient', data);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Label htmlFor="clientName">Client Name</Label>
        <Input
          id="clientName"
          {...register('clientName', { required: 'Client name is required' })}
        />
        {errors.clientName && typeof errors.clientName.message === 'string' && (
          <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && typeof errors.email.message === 'string' && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
    </form>
  );
};

