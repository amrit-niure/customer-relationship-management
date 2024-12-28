import React from 'react';
import { useFormContext } from './FormContext';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { preferencesSchema, PreferencesFormData } from './schema';

interface PreferencesFormProps {
  onSubmit?: (data: PreferencesFormData) => void;
  stepName?: string;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ onSubmit }) => {
  const { formData, updateFormData } = useFormContext();
  const { register, handleSubmit, formState: { errors }, control } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: formData.preferences || {}
  });

  const onSubmitForm = (data: PreferencesFormData) => {
    updateFormData('preferences', data);
    if (onSubmit) onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Label htmlFor="favoriteColor">Favorite Color</Label>
        <Input
          id="favoriteColor"
          {...register('favoriteColor')}
        />
        {errors.favoriteColor && <p className="text-red-500 text-sm mt-1">{errors.favoriteColor.message}</p>}
      </div>
      <div>
        <Label htmlFor="communicationPreference">Preferred Communication Method</Label>
        <Controller
          name="communicationPreference"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a communication method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.communicationPreference && <p className="text-red-500 text-sm mt-1">{errors.communicationPreference.message}</p>}
      </div>
    </form>
  );
};

