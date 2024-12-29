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
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "@/hooks/use-toast";
import { useServerAction } from "zsa-react";
import { clientSchema, IClient } from "../../schema";
import { createClientAction, updateClientAction } from "../../actions";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";
import { Client } from "@/db/schema/clients";
import { sanitizeData } from "@/lib/utils";

interface CreateClientFormProps {
  initialValues?: Client;
  isUpdate?: boolean;
}

export default function CreateClientForm({
  initialValues,
  isUpdate,
}: CreateClientFormProps) {
  const router = useRouter();
  const form = useForm<IClient>({
    resolver: zodResolver(clientSchema),
    defaultValues: sanitizeData(initialValues) || {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      passportNumber: "",
      currentVisa: undefined,
      visaExpiry: undefined,
      isActive: true,
    },
  });

  const { execute, isPending } = useServerAction(
    isUpdate ? updateClientAction : createClientAction,
    {
      onSuccess() {
        toast({
          title: "Action Successful",
          description: "The client record is created successfully",
        });
        form.reset();
        router.push("../");
      },
      onError(result) {
        toast({
          variant: "destructive",
          description: result.err.message,
        });
      },
    }
  );

  async function onSubmit(values: IClient) {
    if (isUpdate && initialValues?.id) {
      execute({ id: initialValues.id, ...values });
    }else{
      execute(values)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Amrit" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-4 col-span-12">
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
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

          <div className="md:col-span-4 col-span-12">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Niure" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@xyz.com" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput placeholder="" {...field} defaultCountry="TR" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="2 Some Road , Sydney, Australia"
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 self-end">
            <FormField
              control={form.control}
              name="visaExpiry"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value === "active")
                    }
                    defaultValue={field.value ? "active" : "passive"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="passive">Passive</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner text={"Submitting"} /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
