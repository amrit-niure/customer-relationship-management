import React from 'react';
import { useFormContext } from './FormContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addressSchema, AddressFormData } from './schema';

interface AddressFormProps {
    onSubmit?: (data: AddressFormData) => void;
    stepName?: string;
  }
  
  export const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
    const { formData, updateFormData } = useFormContext();
    const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
      resolver: zodResolver(addressSchema),
      defaultValues: formData.address || {}
    });
  
    const onSubmitForm = (data: AddressFormData) => {
      updateFormData('address', data);
      if (onSubmit) onSubmit(data);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            {...register('street')}
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...register('city')}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            {...register('zipCode')}
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
        </div>
      </form>
    );
  };
  
  