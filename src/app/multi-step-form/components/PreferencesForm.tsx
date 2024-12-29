import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { preferencesSchema, PreferencesFormData } from '../schemas/formSchemas';

interface PreferencesFormProps {
  formData?: PreferencesFormData;
  updateForm: (data: PreferencesFormData) => void;
  handlePrevious: () => void;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ formData, updateForm, handlePrevious }) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: formData || {}
  });

  const onSubmit = (data: PreferencesFormData) => {
    updateForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div className="flex justify-between">
        <Button type="button" onClick={handlePrevious} variant="outline">Previous</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

