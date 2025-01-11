"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { SmartDatetimeInput } from "@/components/ui/smart-datetime-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IOfficeVisit, officeVisitSchema } from "../schema";
import { FC } from "react";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CalendarPlus } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface OfficeVisitFormProps {
  onClose: () => void;
}

const OfficeVisitForm: FC<OfficeVisitFormProps> = ({ onClose }) => {
    const searchParams = useSearchParams();
  
    const firstName = searchParams.get("firstName");
    const middleName = searchParams.get("middleName");
    const lastName = searchParams.get("lastName");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    const address = searchParams.get("address");
    const appointmentId = searchParams.get("appointmentId");

  const form = useForm<IOfficeVisit>({
    resolver: zodResolver(officeVisitSchema),
    defaultValues: {
      appointmentId: appointmentId ? appointmentId : "",
      firstName: firstName ? firstName : "",
      middleName: middleName ? middleName : "",
      lastName: lastName ? lastName : "",
      email: email ? email : "",
      address: address ? address : "",
      phone: phone ? phone : "",
      dateTime: new Date(),
      status: "SCHEDULED",
      purpose: "",
    },
  });

  function onSubmit(values: IOfficeVisit) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      onClose();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div>
      <SheetHeader>
        <SheetTitle className="flex gap-2 items-center">
          <CalendarPlus />
          Mark New Office Visit
        </SheetTitle>
        <SheetDescription>
          Fill in the details to mark a new office visit.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" type="email" {...field} />
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
                  <Input placeholder="" type="text" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput placeholder="" {...field} defaultCountry="TR" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />


              <FormField
                control={form.control}
                name="dateTime"
                render={({ field }) => (
                  <FormItem > 
                    <FormLabel>Date and Time</FormLabel>
                    <FormControl>
                      <SmartDatetimeInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="e.g. Tomorrow morning 9am"
                      />
                    </FormControl>
                    <FormDescription>
                      First choose the time and then the date.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Textarea placeholder="" className="resize-none" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default OfficeVisitForm;
