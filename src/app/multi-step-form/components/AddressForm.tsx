import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { addressSchema, AddressFormData } from '../schemas/formSchemas';

interface AddressFormProps {
  formData?: AddressFormData;
  updateForm: (data: AddressFormData) => void;
  handleNext: () => void;
  handlePrevious: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ formData, updateForm, handleNext, handlePrevious }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: formData || {}
  });

  const onSubmit = (data: AddressFormData) => {
    updateForm(data);
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div className="flex justify-between">
        <Button type="button" onClick={handlePrevious} variant="outline">Previous</Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

