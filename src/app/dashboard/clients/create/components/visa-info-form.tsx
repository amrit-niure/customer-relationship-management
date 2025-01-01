"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientVisaInfoSchema, IClientFull, IClientVisaInfo } from "../../schema";
import { sanitizeData } from "@/lib/utils";

interface ClientVisaInfoProps {
  formData?: IClientFull;
  updateForm: (data: IClientVisaInfo) => void;
  handleNext: () => void;
  handlePrevious: () => void;
}

export default function ClientVisaInfoForm({
  formData,
  updateForm,
  handleNext,
  handlePrevious,
}: ClientVisaInfoProps) {
  const form = useForm<IClientVisaInfo>({
    resolver: zodResolver(clientVisaInfoSchema),
    defaultValues: sanitizeData(formData?.clientVisaInfo) || {},
  });

  const onSubmit = (data: IClientVisaInfo) => {
    updateForm(data);
    handleNext();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value ?? ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="firstLandedOn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>First Land On Australia</FormLabel>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value ?? ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="firstLandedVisa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Visa</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Visa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SUB_500">500</SelectItem>
                      <SelectItem value="SUB_482">482</SelectItem>
                      <SelectItem value="SUB_485">485</SelectItem>
                      <SelectItem value="SUB_407">407</SelectItem>
                      <SelectItem value="SUB_186">186</SelectItem>
                      <SelectItem value="SUB_189">189</SelectItem>
                      <SelectItem value="SUB_190">190</SelectItem>
                      <SelectItem value="SUB_600">600</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="currentVisa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Visa</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select current Visa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SUB_500">500</SelectItem>
                      <SelectItem value="SUB_482">482</SelectItem>
                      <SelectItem value="SUB_485">485</SelectItem>
                      <SelectItem value="SUB_407">407</SelectItem>
                      <SelectItem value="SUB_186">186</SelectItem>
                      <SelectItem value="SUB_189">189</SelectItem>
                      <SelectItem value="SUB_190">190</SelectItem>
                      <SelectItem value="SUB_600">600</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="visaExpiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visa Expiry Date</FormLabel>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value ?? ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" onClick={handlePrevious} variant="outline">
            Previous
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
