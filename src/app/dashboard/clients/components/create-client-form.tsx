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
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { useServerAction } from "zsa-react";
import { clientSchema, IClient } from "../validation";
import { createClientAction } from "../actions";

export default function CreateClientForm() {
  const form = useForm<IClient>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      passportNumber: "",
      currentVisa: undefined,
      visaExpiry: new Date(),
      isActive: true,
    },
  });

  const { execute , isPending } = useServerAction(createClientAction,{
    onSuccess() {
      toast({
        title: "Action Successful",
        description: "The client record is created successfully"
      })
      form.reset()
    },
    onError(result) {
      toast({
        variant: "destructive",
        description: result.err.message,
      });
    }
  })

  async function onSubmit(values: IClient) {
   await execute(values)
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
                    <Input placeholder="" type="text" {...field} />
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
                    <Input placeholder="shadcn" type="text" {...field} />
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
                    <Input placeholder="" type="text" {...field} />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="visaExpiry"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Visa Expiry Date</FormLabel>
                  <DatetimePicker
                    {...field}
                    format={[
                      ["months", "days", "years"],
                      ["hours", "minutes", "am/pm"],
                    ]}
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

        <Button type="submit" disabled={isPending}>Submit</Button>
      </form>
    </Form>
  );
}
